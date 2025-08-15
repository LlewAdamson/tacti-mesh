const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (process.platform === 'win32') {
  app.setAppUserModelId('com.tacti.mesh');
}

const isDev = process.env.IS_DEV === 'true';
const isMac = process.platform === 'darwin';

let mainWindow = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1200,
    minWidth: 1600,
    minHeight: 900,
    show: false,
    center: true, // Center the window on screen
    icon: path.join(__dirname, '../public/icon.png'),
    titleBarStyle: 'default', // Use default title bar for proper dragging
    trafficLightPosition: isMac ? { x: 15, y: 15 } : undefined,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    
    // Maximize window for better visibility
    mainWindow?.maximize();
    
    // Open DevTools in development
    if (isDev) {
      mainWindow?.webContents.openDevTools();
    }
  });

  // Load the app
  // Always use dev server when running from npm scripts
  // For production builds, this will be changed during build process
  mainWindow.loadURL('http://localhost:5173');

  // Open links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (_, contents) => {
  contents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
});

// IPC Handlers
ipcMain.handle('app:version', () => app.getVersion());

ipcMain.handle('app:quit', () => {
  app.quit();
});

ipcMain.handle('app:minimize', () => {
  mainWindow?.minimize();
});

ipcMain.handle('app:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

// Handle protocol for deep linking (tacti-mesh://)
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('tacti-mesh', process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient('tacti-mesh');
}
