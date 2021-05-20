import {useState, useEffect} from 'react'
import axios from 'axios'
import Transaction from './Transaction'

const Home = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
  
    useEffect(() => {
        const fetchData = async () => {
            const creds = await window.electron.getCredentials()
            const auth = {
                username:creds.username, 
                password:creds.password
            }
            const url = `http://${creds.host}:${creds.port}/`

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
                params: []
            },
            {
                auth: auth
            })

            axios.all([getbalance, listtransactions])
            .then(axios.spread((...responses) => {
                let result = {}
                result['getbalance'] = responses[0].data.result
                result['listtransactions'] = responses[1].data.result
                setData(result)
                setIsLoaded(true)
            })).catch((error) => {
                console.log(error)
                setError(error)
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
            <div className="Home">
                <div className="balance card">Balance: {data.getbalance}</div>
                <div className="transactions card">
                    {data.listtransactions.map((tx, index) => (
                        <Transaction key={index} tx={tx} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Home
