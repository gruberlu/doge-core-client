import {useState, useEffect} from 'react'
import axios from 'axios'
import {getinfo, getbalance} from './requests'

const Home = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
  
    useEffect(() => {
        axios.all([getinfo, getbalance])
        .then(axios.spread((...responses) => {
            let result = {}
            result['getinfo'] = responses[0].data.result
            result['getbalance'] = responses[1].data.result
            setData(result)
            setIsLoaded(true)
        })).catch((error) => {
            console.log(error)
            setError(error)
        })

    }, [])
    
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <div>Balance: {data.getbalance}</div>
            </div>
        )
    }
}

export default Home
