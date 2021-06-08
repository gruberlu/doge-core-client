const path = require('path')

const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const isDev = require('electron-is-dev')

const Store = require('./store')

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
    app.quit()
}

function createWindow () {
    let {width, height} = store.get('windowBounds')

    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: !isDev
        }
  })

  ipcMain.handle('theme:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
      } else {
        nativeTheme.themeSource = 'dark'
      }
      return nativeTheme.shouldUseDarkColors
  })
  
  ipcMain.handle('theme:isdark', () => {
      return nativeTheme.shouldUseDarkColors
  })
  
  ipcMain.handle('rpc:creds', () => {
        const creds = store.get('rpcCredentials')
        return creds
  })

  ipcMain.handle('rpc:setcreds', (event, creds) => {
      store.set('rpcCredentials', creds)
  })

  win.on('resize', () => {
    let { width, height } = win.getBounds()
    store.set('windowBounds', { width, height })
  });

  isDev ? win.loadURL('http://localhost:3000') : win.loadFile('index.html')

  if (isDev) {
    // Open the DevTools
    win.webContents.once('dom-ready', () => {
        win.webContents.openDevTools()
    })
  }
}

// Load user-preferences.js
const store = new Store({
    configName: 'config',
    defaults: {
        windowBounds: {
            width: 800, 
            height: 600 
        },
        rpcCredentials: {
            username: 'user',
            password: 'password',
            host:"localhost",
            port: 22555
        }
  }
})

app.whenReady().then(() => {
  createWindow()

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(error => console.log(`An error occurred: , ${error}`))
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})