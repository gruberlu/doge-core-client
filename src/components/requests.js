import axios from 'axios'

const auth = {username: 'luigi', password: 'mytest!'}
const url = 'http://localhost:22555/'

// Define API requests
const getinfo = axios.post(url, {
    jsonrpc: "1.0",
    method: 'getinfo',
    params: []
},
{
    auth: auth
})

const getbalance = axios.post(url, {
    jsonrpc: "1.0",
    method: 'getbalance',
    params: []
},
{
    auth: auth
})

export {getinfo, getbalance}