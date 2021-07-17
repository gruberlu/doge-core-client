import { useState, useEffect } from 'react'
import { Card } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'
import Transaction from './Transaction'

export const Transactions = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [transactions, setTransactions] = useState()

    useEffect(() => {
        const fetchData = async () => {

            const creds = await window.electron.getCredentials()
            const auth = {
                username: creds.username,
                password: creds.password
            }
            const url = `http://${creds.host}:${creds.port}/`

            const listtransactions = axios.post(url, {
                jsonrpc: "1.0",
                method: 'listtransactions',
                params: ["*", 100]
            },
                {
                    auth: auth
                })

            listtransactions.then(response => {
                setTransactions(response.data.result.reverse())
                setIsLoaded(true)
            }).catch((error) => {
                setError(error)
                console.log(error)
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
            <div className="Transactions">
                <Alert severity="error" className="snackbar" onClose={handleClose}>Error! No connection to RPC Server!</Alert>
            </div>
        )
    } else if (!isLoaded) {
        return <Skeleton variant="rect" className="skeleton" height="90%" />
    } else {
        return (
            <div className="Transactions">
                <Card className="Card">
                    <h1>Transactions</h1>
                    <div className="transactionsWrapper">
                        {transactions.map((tx, index) => (
                            <Transaction key={index} tx={tx} seperator={index !== transactions.length - 1} />
                        ))}
                    </div>
                </Card>
            </div>
        )
    }
}
