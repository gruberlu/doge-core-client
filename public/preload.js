const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        setTheme: async () => {
            const response = await ipcRenderer.invoke('theme:toggle')
            return response
        },
        getTheme: async () => {
            const response = await ipcRenderer.invoke('theme:isdark')
            return response
        },
        getCredentials: async () => {
            const response = await ipcRenderer.invoke('rpc:creds')
            return response
        },
        setCredentials: (creds) => {
            ipcRenderer.invoke('rpc:setcreds', creds)
        },
    }
)