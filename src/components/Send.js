import {useState} from 'react'
import {Snackbar, Card} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import * as Icons from '@material-ui/icons'
import axios from 'axios'
import Inputfield from './Inputfield'

export const Send = () => {

    const [address, setAddress] = useState()
    const [amount, setAmount] = useState()
    const [label, setLabel] = useState()
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const submitForm = (e) => {
        e.preventDefault()

        const postData = async () => {
            const creds = await window.electron.getCredentials()
            const auth = {
                username:creds.username, 
                password:creds.password
            }
            const url = `http://${creds.host}:${creds.port}/`

            const sendtoaddress = axios.post(url, {
                jsonrpc: "1.0",
                method: 'sendtoaddress',
                params: [address, amount, "", label]
            },
            {
                auth: auth
            })

            sendtoaddress.then(response => {
                console.log(response)
                setResult(response.data.result)
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
        setResult(null)
    }

    return (
        <div className="Send">
            <Card className="Card">
                <h1>Send to Address</h1>
                <div className="formwrapper">
                    <div className="icons">
                        <Icons.Person />
                        <Icons.MonetizationOn />
                        <Icons.Sms />
                    </div>
                    <form>
                        <Inputfield id="address" label="Address" required={true} onChange={(value) => {setAddress(value)}} />
                        <Inputfield id="amount" label="Amount" required={true} onChange={(value) => {setAmount(value)}} />
                        <Inputfield id="label" label="Label" onChange={(value) => {setLabel(value)}} />
                        <button type="submit" onClick={(e) => {submitForm(e)}}>Submit</button>
                    </form>
                </div>
            </Card>
            <Snackbar className="snackbox" autoHideDuration={6000} open={result} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose}>Success! {result}</Alert>
            </Snackbar>
            <Snackbar className="snackbox" autoHideDuration={6000} open={error} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>Error!</Alert>
            </Snackbar>
        </div>
    )
}

