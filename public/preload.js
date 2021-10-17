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
        getHost: async () => {
            const response = await ipcRenderer.invoke('rpc:host')
            return response
        },
        setHost: (host) => {
            ipcRenderer.invoke('rpc:sethost', host)
        },
    }
)