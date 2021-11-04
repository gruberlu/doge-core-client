const fs = require('fs')
const https = require('https')
const path = require('path')
const axios = require('axios')

const { app } = require('electron')

const store = require('./store')

class RPCClient {
    constructor() {
        this.httpsAgent = (
                        fs.existsSync(path.join(app.getPath('userData'), 'client.crt')) && 
                        fs.existsSync(path.join(app.getPath('userData'), 'ca.crt')) && 
                        fs.existsSync(path.join(app.getPath('userData'), 'client.key')) 
                    ) ? 
                    new https.Agent({
                        cert: fs.readFileSync(path.join(app.getPath('userData'), 'client.crt')),
                        key: fs.readFileSync(path.join(app.getPath('userData'), 'client.key')),
                        ca: fs.readFileSync(path.join(app.getPath('userData'), 'ca.crt'))
                    }) : null
    }

    async getinfo(creds) {
        const con = store.get('rpc')
        const protocol = con.mtls ? 'https' : 'http'
        return await axios.post(`${protocol}://${con.host}:${con.port}/`,
            {
                jsonrpc: "1.0",
                method: 'getinfo',
                params: []
            },
            {
                auth: creds,
                httpsAgent: con.mtls ? this.httpsAgent : null
            }
        )
    }

    async getbalance(creds) {
        const con = store.get('rpc')
        const protocol = con.mtls ? 'https' : 'http'
        return await axios.post(`${protocol}://${con.host}:${con.port}/`,
            {
                jsonrpc: "1.0",
                method: 'getbalance',
                params: []
            },
            {
                auth: creds,
                httpsAgent: con.mtls ? this.httpsAgent : null
            }
        )
    }

    async listtransactions(creds, params) {
        const con = store.get('rpc')
        const protocol = con.mtls ? 'https' : 'http'
        return await axios.post(`${protocol}://${con.host}:${con.port}/`,
            {
                jsonrpc: "1.0",
                method: 'listtransactions',
                params: params
            },
            {
                auth: creds,
                httpsAgent: con.mtls ? this.httpsAgent : null
            }
        )
    }

    async getblockcount(creds) {
        const con = store.get('rpc')
        const protocol = con.mtls ? 'https' : 'http'
        return await axios.post(`${protocol}://${con.host}:${con.port}/`,
            {
                jsonrpc: "1.0",
                method: 'getblockcount',
                params: []
            },
            {
                auth: creds,
                httpsAgent: con.mtls ? this.httpsAgent : null
            }
        )
    }

    async getnewaddress(creds, params) {
        const con = store.get('rpc')
        const protocol = con.mtls ? 'https' : 'http'
        return await axios.post(`${protocol}://${con.host}:${con.port}/`,
            {
                jsonrpc: "1.0",
                method: 'getnewaddress',
                params: params
            },
            {
                auth: creds,
                httpsAgent: con.mtls ? this.httpsAgent : null
            }
        )
    }

    async sendtoaddress(creds, params) {
        const con = store.get('rpc')
        const protocol = con.mtls ? 'https' : 'http'
        return await axios.post(`${protocol}://${con.host}:${con.port}/`,
            {
                jsonrpc: "1.0",
                method: 'sendtoaddress',
                params: params
            },
            {
                auth: creds,
                httpsAgent: con.mtls ? this.httpsAgent : null
            }
        )
    }

}

module.exports = RPCClient