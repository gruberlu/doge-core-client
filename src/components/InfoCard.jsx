import {useEffect, useState} from 'react'
import {Card} from '@material-ui/core'
import * as Icons from '@material-ui/icons'
import axios from 'axios'

export const InfoCard = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [info, setInfo] = useState()

    useEffect(() => {
        const fetchData = async () => {

            const creds = await window.electron.getCredentials()
            const auth = {
                username:creds.username, 
                password:creds.password
            }
            const url = `http://${creds.host}:${creds.port}/`

            const getinfo = axios.post(url, {
                jsonrpc: "1.0",
                method: 'getinfo',
                params: []
            },
            {
                auth: auth
            })

            getinfo.then(response => {
                // console.log(response)
                setInfo(response.data.result)
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

    const closeInfo = (e) => {
        e.preventDefault()
        const infoCard = document.querySelector(".InfoCard")
        infoCard.classList.toggle("hidden")
    }

    return (
        <div className="InfoCard hidden">
            <Card className="Card">
                <button onClick={(e) => closeInfo(e)}><Icons.Close /></button>
                <h1>Wallet Info</h1>
                {error  ? <div>Error: {error.message}</div> : !isLoaded ? <div>Loading...</div> :
                <div className="info">
                    <div><div className="label">Version:</div><div>{info.version}</div></div>
                    <div><div className="label">Difficulty:</div><div>{info.difficulty}</div></div>
                    <div><div className="label">Connections:</div><div>{info.connections}</div></div>
                    <div><div className="label">Testnet:</div><div>{info.version ? "Yes" : "No"}</div></div>
                </div>}
            </Card>
        </div>
        )
}

