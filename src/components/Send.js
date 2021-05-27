import {useState} from 'react'
import * as Icons from '@material-ui/icons'
import axios from 'axios'
import Inputfield from './Inputfield'

const Send = () => {

    const [address, setAddress] = useState()
    const [amount, setAmount] = useState()
    const [comment, setComment] = useState()
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
                params: [address, amount, comment]
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

    return (
        <div className="Send">
            <h1>Send</h1>
            <form>
                <Inputfield id="address" label="Address" onChange={(value) => {setAddress(value)}} />
                <Inputfield id="amount" label="Amount" onChange={(value) => {setAmount(value)}} />
                <Inputfield id="comment" label="Comment" onChange={(value) => {setComment(value)}} />
                <button type="submit" onClick={(e) => {submitForm(e)}}>Submit</button>
                {result ? <div className="success"><p>Transaction created!</p></div> : <></>}
                {error ? <div className="error"><Icons.Error /><p>Error! Input invalid or no connection to RPC Server!</p></div> : <></>}
            </form>
        </div>
    )
}

export default Send
