const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Keep a global reference of the window object
let mainWindow;
let serverProcess;

const isDev = process.env.ELECTRON_IS_DEV === '1';
const PORT = process.env.PORT || 3000;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    show: false, // Don't show until ready
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default'
  });

  // Start the Express server
  startServer();

  // Load the app after server starts
  setTimeout(() => {
    mainWindow.loadURL(`http://localhost:${PORT}`);
    
    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      
      if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    });
  }, 2000);

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
    stopServer();
  });

  // Handle window events
  mainWindow.on('page-title-updated', (e) => {
    e.preventDefault(); // Keep our custom title
  });

  // Create application menu
  createMenu();
}

function startServer() {
  try {
    console.log('Starting Myrient Viewer server...');
    
    // Set environment for Electron mode
    process.env.ELECTRON_MODE = '1';
    
    // Start the Express server in the same process (more reliable for packaged apps)
    const serverPath = app.isPackaged 
      ? path.join(process.resourcesPath, 'app.asar', 'server.js')
      : path.join(__dirname, 'server.js');
    
    console.log('Loading server from:', serverPath);
    
    // Import and start the server in the same process
    delete require.cache[serverPath]; // Clear cache in case of reload
    const { startServer: startExpressServer } = require(serverPath);
    startExpressServer();
    
    console.log('Server started successfully');
  } catch (error) {
    console.error('Error starting server:', error);
    showErrorDialog('Startup Error', `Failed to start the server: ${error.message}`);
  }
}

function stopServer() {
  // Since server runs in same process, just log the shutdown
  console.log('Server shutdown requested...');
  // The server will be stopped when the main process exits
}

function createMenu() {
  const template = [
    ...(process.platform === 'darwin' ? [{
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Clear Queue',
          click: () => {
            mainWindow.webContents.executeJavaScript('app.clearQueue()');
          }
        },
        { type: 'separator' },
        ...(process.platform !== 'darwin' ? [{ role: 'quit' }] : [])
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'actualSize' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Navigate',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+Left',
          click: () => {
            mainWindow.webContents.goBack();
          }
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+Right',
          click: () => {
            mainWindow.webContents.goForward();
          }
        },
        {
          label: 'Home',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            mainWindow.webContents.executeJavaScript('app.loadDirectory("")');
          }
        },
        {
          label: 'Refresh Directory',
          accelerator: 'F5',
          click: () => {
            mainWindow.webContents.executeJavaScript('app.refreshDirectory()');
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [])
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Myrient Viewer',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Myrient Viewer',
              message: 'Myrient Viewer',
              detail: `Version: ${app.getVersion()}\n\nA desktop application for browsing Myrient file structure and managing download queues.\n\nBuilt with Electron and Node.js.`
            });
          }
        },
        {
          label: 'Visit Myrient',
          click: () => {
            shell.openExternal('https://myrient.erista.me/');
          }
        },
        { type: 'separator' },
        {
          label: 'Open DevTools',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function showErrorDialog(title, content) {
  dialog.showErrorBox(title, content);
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  stopServer();
  
  // On macOS, keep the app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  stopServer();
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent, navigationURL) => {
    navigationEvent.preventDefault();
    shell.openExternal(navigationURL);
  });
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  // Allow localhost certificates in development
  if (isDev && url.startsWith('http://localhost:')) {
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});

// Set app user model id for Windows
if (process.platform === 'win32') {
  app.setAppUserModelId('com.myrientviewer.app');
}