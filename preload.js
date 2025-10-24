const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  saveExecutableScript: (content, filename) => 
    ipcRenderer.invoke('save-executable-script', { content, filename }),
  chooseFolder: () => ipcRenderer.invoke('choose-folder'),
  openFolder: (dirPath) => ipcRenderer.invoke('open-folder', { dirPath }),
  
  isElectron: true
});
