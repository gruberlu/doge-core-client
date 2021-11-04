import { useState, useEffect } from 'react'
import { Card } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import MuiAlert from '@material-ui/lab/Alert'
import Transaction from './Transaction'
import { useCreds } from '../context/CredsContext'

export const Transactions = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [transactions, setTransactions] = useState()
    const creds = useCreds()

    useEffect(() => {
        const fetchData = async () => {
            let data = {}
            try {
                data = await window.electron.invoke('rpc:listtransactions', creds, ["*", 100])
                setTransactions(data.reverse())
                setIsLoaded(true)
            }
            catch (error) {
                setError(true)
            }
        }

        fetchData()

        const updateData = setInterval(fetchData, 10000)

        return () => clearInterval(updateData)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
