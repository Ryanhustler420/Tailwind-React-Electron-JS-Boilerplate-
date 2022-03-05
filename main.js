const path = require('path');
const _ = require('lodash');
const os = require('os');
const fs = require('fs');
const mkdir = require('mkdirp');
const FileIO = require('./FileIO');
const isDev = require("electron-is-dev");
const { autoUpdater } = require('electron-updater');
const { app, BrowserWindow, Tray, Menu, globalShortcut, dialog, crashReporter } = require('electron');

require('dotenv').config();
require(path.join(__dirname, 'listeners'))(app);
// const dockIcon = path.join(__dirname, 'assets', 'images', 'logo-black.png')
// const trayIcon = path.join(__dirname, 'assets', 'images', 'logo-black.png')

let baseUrl = isDev ? `http://localhost:3002` : `https://www.domain.com`;
let url_render = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`;
let splashWindow,
  mainWindow,
  tray = null,
  iconPath = path.join(__dirname, `./src/logo.png`);

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) app.quit();
if (isDev) require('electron-reload')(__dirname);

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 200,
    minWidth: 450,
    minHeight: 200,
    closable: false,
    frame: false,
    hasShadow: false,
    fullscreenable: false,
    alwaysOnTop: false,
    minimizable: false,
    transparent: false,
    maximizable: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      // webSecurity: false, // bad way to bypass 'cors' # https://pratikpc.medium.com/bypassing-cors-with-electron-ab7eaf331605
      nodeIntegration: false, // prevent html to access the ipcRenderer, so that they can't missuse these function
      contextIsolation: true, // cant override preload file values via console of browser
      enableRemoteModule: true, // Allow renderer to access Electron Native API which only get access in main thread
      backgroundThrottling: true,
      worldSafeExecuteJavaScript: true, // Sanitize JS code
    }
  });

  splashWindow.loadURL(`file://${__dirname}/splash.html`)
  splashWindow.on('closed', () => { splashWindow = null });
  return splashWindow;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    show: false,
    frame: true,
    resizable: true,
    autoHideMenuBar: true,
    // titleBarStyle: 'customButtonsOnHover',
    backgroundColor: '#fff', // white
    webPreferences: {
      // webSecurity: false, // bad way to bypass 'cors' # https://pratikpc.medium.com/bypassing-cors-with-electron-ab7eaf331605
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // prevent html to access the ipcRenderer, so that they can't missuse these function
      contextIsolation: true, // cant override preload file values via console of browser
      enableRemoteModule: true, // Allow renderer to access Electron Native API which only get access in main thread
      backgroundThrottling: true,
      worldSafeExecuteJavaScript: true, // Sanitize JS code
    }
  });

  if (isDev) openDevToolsForMainWindow();
  mainWindow.on('closed', () => { mainWindow = null });
  mainWindow.loadURL(url_render);
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // const template = require('./utils/Menu').createTemplate(app);
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu)

  const mainApp = createWindow();
  const splash = createSplashWindow();
  mainApp.setMenu(null);

  // tray = new Tray(trayIcon);
  // tray.setContextMenu(menu); // we can create new menu for this but we're just fine and can use an existing menu instance
  // tray.setToolTip('MyApplication');

  app.setAppUserModelId('AppName');
  mainApp.once('ready-to-show', () => {
    splash.destroy();
    mainApp.show();
    if (isDev) {
      mainWindow.webContents.on('did-frame-finish-load', async () => {
        if (process.env.NODE_ENV === 'development') {
          const installer = require("electron-devtools-installer");
          const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
          const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

          Promise.all(
            extensions.map(name => installer.default(installer[name], forceDownload))
          ).catch(err => console.log(err));
        }
      });
    }
  })
})
app.whenReady().then(() => autoUpdater.checkForUpdatesAndNotify()).catch(err => console.log(err));

app.whenReady().then(async () => {
  const ENV = app.isPackaged ? 'production' : 'development';
  const FILE_DUMPS = path.join(os.homedir(), `AppName-${ENV}`);
  const pathToBatch = path.join(FILE_DUMPS, 'batch')

  if (!fs.existsSync(FILE_DUMPS)) await mkdir(FILE_DUMPS);

  // registrating only accelerator
  FileIO.read(pathToBatch, 'settings.json', async (e, response) => {
    let final = (_.isUndefined(response) && _.isEmpty(response)) ? JSON.stringify({}) : JSON.parse(response);
    final = _.isEmpty(final) ? JSON.stringify({}) : final;

    app.on('browser-window-focus', (e) => {
      // console.log('application is in focuse');
      if (final['dev-console'] || isDev) globalShortcut.register('CmdOrCtrl+Shift+.', () => {
        if (isDevToolsOpenForMainWindow()) closeDevToolsForMainWindow(); else openDevToolsForMainWindow();
      });

      if (final['refresh'] || isDev) globalShortcut.register('CmdOrCtrl+Shift+R', () => mainWindow.reload());
      globalShortcut.register('CmdOrCtrl+Shift+S', () => mainWindow.webContents.send('hotkey::success', { reduxStateKey: 'sideBarVisible', description: 'Sidebar Visibility Toggled' }));
      globalShortcut.register('CmdOrCtrl+Shift+H', () => mainWindow.webContents.send('hotkey::success', { reduxStateKey: 'headerVisible', description: 'Header Visibility Toggled' }));
      globalShortcut.register('CmdOrCtrl+Shift+F', () => mainWindow.webContents.send('hotkey::success', { reduxStateKey: 'footerVisible', description: 'Footer Visibility Toggled' }));
      // globalShortcut.register('CmdOrCtrl+Shift+A', () => mainWindow.webContents.send('pageRequest::success', { to: '/create_new_ad_poll' }));
      globalShortcut.register('CmdOrCtrl+Shift+C', () => mainWindow.webContents.send('pageRequest::success', { to: '/register' }));
      globalShortcut.register('CmdOrCtrl+Shift+Backspace', () => mainWindow.webContents.send('goBack::success'));
    });

    app.on('browser-window-blur', (e) => {
      // console.log('application hidden');
      globalShortcut.unregisterAll();
    });

  }).catch(err => console.log(err));
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox(mainWindow, {
    message: 'A new update is available. Downloading now...',
    title: 'Update Aleart',
    buttons: ['Ok']
  }).then(({ checkboxChecked, response }) => { })
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(mainWindow, {
    message: 'Update Downloaded. It will be installed on restart. Restart now?',
    buttons: ['Restart', 'Close'],
    title: 'Updating Finished',
  }).then(({ checkboxChecked, response }) => {
    if (response == 0) autoUpdater.quitAndInstall();
  })
});

crashReporter.start({
  productName: 'AppName',
  companyName: 'Company Inc',
  submitURL: `${baseUrl}/sandbox/v1/api/common/user/crash-report?machine=windows`,
  autoSubmit: true,
});

function openDevToolsForMainWindow() { mainWindow?.webContents?.openDevTools(); }
function closeDevToolsForMainWindow() { mainWindow?.webContents?.closeDevTools(); }
function isDevToolsOpenForMainWindow() { return mainWindow?.webContents?.isDevToolsOpened(); }

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.