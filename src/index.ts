import { app, BrowserWindow, ipcMain, dialog } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 724,
    width: 1048,
    minHeight: 724,
    minWidth: 1048,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      // We'll NOT import UNSAFE remote resources so it's safe :P
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => mainWindow.show());

  ipcMain.on('close', () => mainWindow.close());
  ipcMain.on('minimize', () => mainWindow.minimize());
  ipcMain.on('maximize', () => mainWindow.maximize());
  ipcMain.on('unmaximize', () => mainWindow.unmaximize());

  ipcMain.handle('open-dialog', (_, options) => dialog.showOpenDialog(mainWindow, options));
  ipcMain.handle('save-dialog', (_, options) => dialog.showSaveDialog(mainWindow, options));

  mainWindow.on('maximize', () => mainWindow.webContents.send('maximize'));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('unmaximize'));

  app.requestSingleInstanceLock();
};

app.applicationMenu = null;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
