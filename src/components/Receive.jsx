import { useState } from 'react'
import { Snackbar, Card } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import * as Icons from '@material-ui/icons'
import axios from 'axios'
import QRCode from 'qrcode.react'
import Inputfield from './Inputfield'
import { useCreds } from '../context/CredsContext'

export const Receive = () => {

    const [label, setLabel] = useState("")
    const [result, setResult] = useState(null)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const creds = useCreds()

    const submitForm = (e) => {
        e.preventDefault()

        const postData = async () => {
            const host = await window.electron.getHost()
            const auth = {
                username: creds.username,
                password: creds.password
            }
            const url = `http://${host.host}:${host.port}/`

            const getnewaddress = axios.post(url, {
                jsonrpc: "1.0",
                method: 'getnewaddress',
                params: [label]
            },
                {
                    auth: auth
                })

            getnewaddress.then(response => {
                console.log(response)
                setResult(response.data.result)
                setSuccess(true)
                setError(null)

            }).catch((error) => {
                console.log(error)
                setError(error)
                setResult(null)
            })
        }

        postData()
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(null)
        setSuccess(null)
    }

    const closeQRCode = (e) => {
        setResult(null)
    }

    return (
        <div className="Receive">
            <Card className="Card">
                <h1>Receive</h1>
                <div className="formWrapper">
                    <form>
                        <Inputfield id="label" label="Label" required={false} onChange={(value) => { setLabel(value) }} />
                        <button type="submit" onClick={(e) => { submitForm(e) }}>Create</button>
                    </form>
                </div>
                {result ? <div id="qrcode">
                    <button onClick={(e) => closeQRCode(e)}><Icons.Close /></button>
                    <div className="header">Your Address:</div>
                    <div className="address">{result}</div>
                    <QRCode
                        value={result}
                        renderAs="svg"
                        fgColor="rgba(0, 0, 0, 0.8)"
                        bgColor="rgba(255, 255, 255, 0.8)"
                    />
                </div>
                    : <></>}
            </Card>
            <Snackbar className="snackbar" autoHideDuration={6000} open={success} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose}>Success!</Alert>
            </Snackbar>
            <Snackbar className="snackbar" autoHideDuration={6000} open={error} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>Error!</Alert>
            </Snackbar>
        </div>
    )
}

