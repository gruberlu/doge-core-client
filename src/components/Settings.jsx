import { useState, useEffect } from 'react'
import { Card, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useCreds, useUpdateCreds } from '../context/CredsContext'

export const Settings = () => {
    const [theme, setTheme] = useState(false)
    const [username, setUsername] = useState('usr')
    const [password, setPassword] = useState('pass')
    const [hostname, setHostname] = useState('localhost')
    const [port, setPort] = useState(12345)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)
    const creds = useCreds()
    const setCreds = useUpdateCreds()

    useEffect(() => {
        const fetchCreds = async () => {
            const host = await window.electron.getHost()
            const theme = await window.electron.getTheme()

            setTheme(theme)

            setUsername(creds.username)
            setPassword(creds.password)
            setHostname(host.host)
            setPort(host.port)
        }

        fetchCreds()
    }, [])

    const handleChange = () => {
        window.electron.setTheme()
        setTheme(!theme)
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

    const submitForm = (e) => {
        e.preventDefault()
        if (username === "" || password === "" || hostname === "" || port === "") {
            setError(true)
        }
        else {
            const creds = {
                username: username,
                password: password
            }
            const host = {
                host: hostname,
                port: port
            }
            window.electron.setHost(host)
            setCreds(creds)
            setResult(true)
        }
    }

    return (
        <div className="Settings">
            <Card className="Card">
                <form>
                    <h1>Settings</h1>
                    <div><label>Darkmode:</label><input id="switch" type="checkbox" checked={theme} onChange={() => handleChange()}></input><label className="switch-label" htmlFor="switch"></label></div>
                    <h3>RPC Credentials:</h3>
                    <div><label>Username:</label><input value={username} required={true} onChange={(e) => { setUsername(e.target.value) }} /></div>
                    <div><label>Password:</label><input value={password} required type="password" onChange={(e) => { setPassword(e.target.value) }} /></div>
                    <div><label>Host:</label><input value={hostname} required onChange={(e) => { setHostname(e.target.value) }} /></div>
                    <div><label>Port:</label><input value={port} required onChange={(e) => { setPort(e.target.value) }} /></div>
                    <button type="submit" onClick={(e) => { submitForm(e) }}>Submit</button>
                </form>
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
