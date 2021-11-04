import { useState } from 'react'
import { Snackbar, Card } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import * as Icons from '@material-ui/icons'
import Inputfield from './Inputfield'
import { useCreds } from '../context/CredsContext'

export const Send = () => {

    const [address, setAddress] = useState()
    const [amount, setAmount] = useState()
    const [label, setLabel] = useState()
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const creds = useCreds()

    const submitForm = (e) => {
        e.preventDefault()

        const postData = async () => {
            let data = {}
            try {
                data = await window.electron.invoke('rpc:sendtoaddress', creds, [address, amount, "", label])
                setResult(data)
                setError(null)
            }
            catch (error) {
                setError(true)
                console.log(error)
                setResult(null)
            }
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
                        <Inputfield id="address" label="Address" required={true} onChange={(value) => { setAddress(value) }} />
                        <Inputfield id="amount" label="Amount" required={true} onChange={(value) => { setAmount(value) }} />
                        <Inputfield id="label" label="Label" onChange={(value) => { setLabel(value) }} />
                        <button type="submit" onClick={(e) => { submitForm(e) }}>Submit</button>
                    </form>
                </div>
            </Card>
            <Snackbar className="snackbar" autoHideDuration={6000} open={result} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose}>Success! {result}</Alert>
            </Snackbar>
            <Snackbar className="snackbar" autoHideDuration={6000} open={error} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>Error!</Alert>
            </Snackbar>
        </div>
    )
}

