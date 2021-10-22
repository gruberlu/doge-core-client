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

module.exports = Store