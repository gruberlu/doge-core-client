import { useEffect, useState } from 'react'
import { Card } from '@material-ui/core'
import * as Icons from '@material-ui/icons'
import { useCreds } from '../context/CredsContext'

export const InfoCard = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [info, setInfo] = useState()
    const creds = useCreds()

    useEffect(() => {
        const fetchData = async () => {
            let data = {}
            try {
                data = await window.electron.invoke('rpc:getinfo', creds)
                setInfo(data)
                // console.log(data)
                setIsLoaded(true)
            }
            catch (error) {
                console.log(error)
                setError(error)
            }
        }

        fetchData()

        const updateData = setInterval(fetchData, 10000)

        return () => clearInterval(updateData)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
                {error ? <div>Error: {error.message}</div> : !isLoaded ? <div>Loading...</div> :
                    <div className="info">
                        <div><div className="label">Version:</div><div>{info.version}</div></div>
                        <div><div className="label">Difficulty:</div><div>{info.difficulty}</div></div>
                        <div><div className="label">Connections:</div><div>{info.connections}</div></div>
                        <div><div className="label">Testnet:</div><div>{info.testnet ? "Yes" : "No"}</div></div>
                    </div>}
            </Card>
        </div>
    )
}

