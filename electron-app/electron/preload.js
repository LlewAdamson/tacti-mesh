const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App control
  quit: () => ipcRenderer.invoke('app:quit'),
  minimize: () => ipcRenderer.invoke('app:minimize'),
  maximize: () => ipcRenderer.invoke('app:maximize'),
  getVersion: () => ipcRenderer.invoke('app:version'),
  
  // Platform info
  platform: process.platform,
  
  // Listen to events from main process
  on: (channel, callback) => {
    const validChannels = ['update-available', 'update-downloaded', 'network-status'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, ...args) => callback(...args));
    }
  },
  
  // Remove listeners
  removeAllListeners: (channel) => {
    const validChannels = ['update-available', 'update-downloaded', 'network-status'];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    }
  },
});
