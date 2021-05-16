const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld(
    'electron',{
        request: (method, params) => {
            return ipcRenderer.invoke('request', method, params)
        }
    }
)