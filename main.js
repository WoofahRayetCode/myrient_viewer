const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');

// Keep a global reference of the window object
let mainWindow;
let serverProcess;
let actualPort;

const isDev = process.env.ELECTRON_IS_DEV === '1';

// Function to find an available port
function findAvailablePort(startPort = 3000) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(startPort, (err) => {
      if (err) {
        // Port is in use, try next port
        server.close();
        findAvailablePort(startPort + 1).then(resolve);
      } else {
        // Port is available
        const port = server.address().port;
        server.close();
        resolve(port);
      }
    });
    
    server.on('error', () => {
      // Port is in use, try next port
      findAvailablePort(startPort + 1).then(resolve);
    });
  });
}

async function createWindow() {
  // Find an available port
  actualPort = await findAvailablePort(process.env.PORT || 3000);
  console.log(`Using port: ${actualPort}`);
  
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

  // Start the Express server with the found port
  startServer();

  // Load the app after server starts
  setTimeout(() => {
    mainWindow.loadURL(`http://localhost:${actualPort}`);
    
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
    console.log(`Starting Myrient Viewer server on port ${actualPort}...`);
    
    // Set environment for Electron mode and port
    process.env.ELECTRON_MODE = '1';
    process.env.PORT = actualPort.toString();
    
    // Start the Express server in the same process (more reliable for packaged apps)
    const serverPath = app.isPackaged 
      ? path.join(process.resourcesPath, 'app.asar', 'server.js')
      : path.join(__dirname, 'server.js');
    
    console.log('Loading server from:', serverPath);
    
    // Import and start the server in the same process
    delete require.cache[serverPath]; // Clear cache in case of reload
    const { startServer: startExpressServer } = require(serverPath);
    startExpressServer();
    
    console.log(`Server started successfully on port ${actualPort}`);
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
  // Remove all menu dropdowns for a cleaner interface
  Menu.setApplicationMenu(null);
}

function showErrorDialog(title, content) {
  dialog.showErrorBox(title, content);
}

// This method will be called when Electron has finished initialization
app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', async () => {
    // On macOS, re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
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