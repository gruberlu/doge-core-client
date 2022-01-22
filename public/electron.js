const path = require('path')

const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

require('update-electron-app')({
    repo: 'grbrlks/doge-core-client',
    updateInterval: '1 hour'
})

const isDev = require('electron-is-dev')

const store = require('./store')

const axios = require('axios')

const RPCClient = require('./rpc')
const rpc = new RPCClient()

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

function createWindow() {
    let { width, height } = store.get('windowBounds')

    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: !isDev
        },
        show: false
    })

    win.on('resize', () => {
        let { width, height } = win.getBounds()
        store.set('windowBounds', { width, height })
    });

    isDev ? win.loadURL('http://localhost:3000') : win.loadFile(path.join(__dirname, '../build/index.html'))

    if (isDev) {
        // Open the DevTools
        win.webContents.once('dom-ready', () => {
            win.webContents.openDevTools()
        })
    }

    win.once('ready-to-show', () => {
        win.show()
    })
}

// IPC

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

ipcMain.handle('rpc:con', () => {
    const con = store.get('rpc')
    return con
})

ipcMain.handle('rpc:setcon', (event, con) => {
    store.set('rpc', con)
})

// RPC over IPC

ipcMain.handle('rpc:getinfo', async (event, creds) => {
    let data = {}
    try {
        data =  await rpc.getinfo(creds)
        // console.log(data)
    }
    catch (error) {
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

ipcMain.handle('rpc:getbalance', async (event, creds) => {
    let data = {}
    try {
        data =  await rpc.getbalance(creds)
        // console.log(data)
    }
    catch (error) {
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

ipcMain.handle('rpc:listtransactions', async (event, creds, params) => {
    let data = {}
    try {
        data =  await rpc.listtransactions(creds, params)
        // console.log(data)
    }
    catch (error) {
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

ipcMain.handle('rpc:getblockcount', async (event, creds) => {
    let data = {}
    try {
        data =  await rpc.getblockcount(creds)
        // console.log(data)
    }
    catch (error) {
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

ipcMain.handle('rpc:getnewaddress', async (event, creds, params) => {
    let data = {}
    try {
        data =  await rpc.getnewaddress(creds, params)
        // console.log(data)
    }
    catch (error) {
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

ipcMain.handle('rpc:sendtoaddress', async (event, creds, params) => {
    let data = {}
    try {
        data =  await rpc.sendtoaddress(creds, params)
        // console.log(data)
    }
    catch (error) {
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

ipcMain.handle('rpc:getpeerinfo', async (event, creds) => {
    let data = {}
    try {
        data =  await rpc.getpeerinfo(creds)
        // console.log(data)
    }
    catch (error) {
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

ipcMain.handle('rpc:getnettotals', async (event, creds) => {
    let data = {}
    try {
        data =  await rpc.getnettotals(creds)
        // console.log(data)
    }
    catch (error) {
        console.log(error)
        throw new Error('No connection to RPC server!')
    }
    return data.data.result
})

// Binance API
ipcMain.handle('binance:price', async () => {
    let response = {}
    try {
        response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT')
    }
    catch (error) {
        throw new Error('Error while trying to fetch data from Binance API')
    }

    return response.data
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