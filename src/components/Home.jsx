import { useState, useEffect } from 'react'
import { Card } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Skeleton from '@material-ui/lab/Skeleton'
import axios from 'axios'
import Transaction from './Transaction'
import { ReactComponent as Coin } from '../assets/icon.svg'
import { useCreds } from '../context/CredsContext'

export const Home = () => {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState({})
    const creds = useCreds()

    useEffect(() => {
        const fetchData = async () => {
            const host = await window.electron.getHost()
            const auth = {
                username: creds.username,
                password: creds.password
            }
            const url = `http://${host.host}:${host.port}/`
            console.log(url)
            const getbalance = axios.post(url, {
                jsonrpc: "1.0",
                method: 'getbalance',
                params: []
            },
                {
                    auth: auth
                })

            const listtransactions = axios.post(url, {
                jsonrpc: "1.0",
                method: 'listtransactions',
                params: ["*", 5]
            },
                {
                    auth: auth
                })

            const getblockcount = axios.post(url, {
                jsonrpc: "1.0",
                method: 'getblockcount',
                params: []
            },
                {
                    auth: auth
                })

            axios.all([getbalance, listtransactions, getblockcount])
                .then(axios.spread((...responses) => {
                    let result = {}
                    result['getbalance'] = responses[0].data.result
                    result['listtransactions'] = responses[1].data.result.reverse()
                    result['getblockcount'] = responses[2].data.result
                    setData(result)
                    setIsLoaded(true)
                })).catch((error) => {
                    console.log(error)
                    setError(error)
                })
        }

        fetchData()

        const updateData = setInterval(fetchData, 10000)

        return () => clearInterval(updateData)

    }, [])

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(null)
    }

    if (error) {
        return (
            <div className="Home">
                <Alert severity="error" className="snackbar" onClose={handleClose}>Error! No connection to RPC Server!</Alert>
            </div>
        )
    } else if (!isLoaded) {
        return <div className="Home">
            <Skeleton variant="rect" className="infoCard skeleton" height="50%" />
            <Skeleton variant="rect" className="transactionsCard skeleton" height="100%" />
        </div>
    } else {
        return (
            <div className="Home">
                <Card className="infoCard Card">
                    <div className="header">Info:</div>
                    <div className="container">
                        <div className="label">Balance: </div>
                        <div className="value">
                            <div>{data.getbalance.toFixed(2)}</div>
                            <Coin className="Coin" />
                        </div>
                    </div>
                    <div className="seperator"></div>
                    <div className="container">
                        <div className="label">Blockcount: </div>
                        <div className="value">{data.getblockcount}</div>
                    </div>
                </Card>

                <Card className="transactionsCard Card">
                    <div className="header">Recent TXs:</div>
                    {data.listtransactions.map((tx, index) => (
                        <Transaction key={index} tx={tx} seperator={index < 4} />
                    ))}
                </Card>
            </div>
        )
    }
}
