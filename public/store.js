const { app } = require('electron')
const path = require('path')
const {writeFileSync, readFileSync} = require('fs')

class Store {
    constructor(opts) {
        const userDataPath = app.getPath('userData')
        this.path = path.join(userDataPath, opts.configName + '.json')
        this.data = parseFile(this.path, opts.defaults)
    }

    get(key) {
        return this.data[key]
    }

    set(key, val) {
        this.data[key] = val
        writeFileSync(this.path, JSON.stringify(this.data))
    }
}
    
function parseFile(path, defaults) {
    try {
        return JSON.parse(readFileSync(path))
    } catch (error) {
        return defaults;
    }
}

const store = new Store({
    configName: 'config',
    defaults: {
        windowBounds: {
            width: 800,
            height: 600
        },
        rpc: {
            mtls: false,
            host: "localhost",
            port: 22555
        }
    }
})

module.exports = store