const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        invoke: async (channel, ...params) => {
            return await ipcRenderer.invoke(channel, ...params)
          }
    }
)