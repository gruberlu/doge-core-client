const path = require('path')
const fetch = require('node-fetch')
const base64 = require('base-64')

const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')

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

ipcMain.handle('request', (event, method, params) => {
    const getData = async (method, params) => {
        const url = 'http://localhost:22555/'
        const username = 'luigi'
        const password = 'mytest!'

         const response = await fetch(url, {
            method:'POST',
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ":" + password)
            },
            username: username,
            password: password,
            body: JSON.stringify({
                jsonrpc: "1.0",
                method: method,
                params: params
            })
        })

        const data = await response.json()
        return data
    }

    return getData(method, params)
})

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),

    }
  })

  isDev ? win.loadURL('http://localhost:3000') : win.loadFile('index.html')

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" })
  }
}

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