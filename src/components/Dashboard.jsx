import { useState, useEffect } from 'react'
import { Card } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Skeleton from '@material-ui/lab/Skeleton'
import { useCreds } from '../context/CredsContext'
import Peer from './Peer'

export const Dashboard = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState({})
    const creds = useCreds()

    useEffect(() => {
        const fetchData = async () => {
            let data = {}
            try {
                data['getinfo'] = await window.electron.invoke('rpc:getinfo', creds)
                data['price'] = await window.electron.invoke('binance:price')
                data['getnettotals'] = await window.electron.invoke('rpc:getnettotals', creds)
                data['getpeerinfo'] = {}
                data['getpeerinfo']['peers'] = await window.electron.invoke('rpc:getpeerinfo', creds)
                data['getpeerinfo']['connections'] = data['getpeerinfo']['peers'].length

                let inbound = 0

                data.getpeerinfo.peers.forEach(() => {
                    inbound += 1
                })

                data['getpeerinfo']['inbound'] = inbound
                data['getpeerinfo']['outbound'] = data.getpeerinfo.connections - inbound

                setData(data)
                setIsLoaded(true)
            }
            catch (error) {
                console.log(error)
                setError(true)
            }
        }

        fetchData()

        const updateData = setInterval(fetchData, 10000)

        return () => clearInterval(updateData)

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setError(null)
    }

    if (error) {
        return (
            <div className="Dashboard">
                <Alert severity="error" className="snackbar" onClose={handleClose}>Error! No connection to RPC Server!</Alert>
            </div>
        )
    } else if (!isLoaded) {
        return (
            // TODO style
            <div className="Dashboard">
                <div className="Grid">
                    <Skeleton variant="rect" className="skeleton binanceCard" height="90%" />
                    <Skeleton variant="rect" className="skeleton infoCard" height="90%" />
                    <Skeleton variant="rect" className="skeleton networkCard" height="90%" />
                </div>
            </div>
        )
    } else {
        return (
            // TODO style and more information on network and blockchain (charts etc.)
            <div className="Dashboard">
                <div className="Grid">
                    <Card className="binanceCard Card">
                        <div className="header">Price</div>
                        <div className="seperator"></div>
                        <div className="container">
                            <div className="label">Doge/USD</div>
                            <div className="value">{Number(data.price.price).toFixed(4)} USD</div>
                        </div>
                    </Card>
                    <Card className="infoCard Card">
                        <div className="header">Info</div>
                        <div className="seperator"></div>
                        <div className="container">
                            <div className="label">Blocks</div>
                            <div className="value">{data.getinfo.blocks}</div>
                        </div>
                        <div className="container">
                            <div className="label">Difficulty</div>
                            <div className="value">{data.getinfo.difficulty}</div>
                        </div>
                    </Card>
                    <Card className="networkCard Card">
                        <div className="header">Network</div>
                        <div className="seperator"></div>
                        <div className="container">
                            <div className="label">Connections</div>
                            <div className="value">{data.getpeerinfo.connections} (Inbound: {data.getpeerinfo.inbound}/Outbound: {data.getpeerinfo.outbound})</div>
                        </div>
                        <div className="container">
                            <div className="label">Bytes received</div>
                            <div className="value">{data.getnettotals.totalbytesrecv / 1000000} MB</div>
                        </div>
                        <div className="container">
                            <div className="label">Bytes sent</div>
                            <div className="value">{data.getnettotals.totalbytessent / 1000} KB</div>
                        </div>
                        <div className="seperator"></div>
                        <div className="subheader">Peers</div>
                        <div className="seperator"></div>
                        <div className="headrow">
                            <div className="headcol">IP</div>
                            <div className="headcol">Node</div>
                        </div>
                        {data.getpeerinfo.peers.map((peer, index) => (
                            <Peer key={index} peer={peer} seperator={index !== data.getpeerinfo.peers.length - 1} />
                        ))}
                    </Card>
                </div>
            </div>
        )
    }
}
