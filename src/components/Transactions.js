import {useState, useEffect} from 'react'
import {Card} from '@material-ui/core'
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
                username:creds.username, 
                password:creds.password
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
                console.log(response)
                setTransactions(response.data.result.reverse())
                setIsLoaded(true)
            }).catch((error) => {
                setError(error)
                console.log(error)
            })
        }

        fetchData()

        const updateData = setInterval(fetchData, 10000)

        return() => clearInterval(updateData)
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="Transactions">
                <Card className="Card">
                    <h1>Transactions</h1>
                    <div className="transactionsWrapper">
                        {transactions.map((tx, index) => (
                                <Transaction key={index} tx={tx} seperator={true} />
                        ))}
                    </div>
                </Card>
            </div>
        )
    }
}
