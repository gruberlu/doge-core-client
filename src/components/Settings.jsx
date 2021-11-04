import { useState, useEffect } from 'react'
import { Card, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useCreds, useUpdateCreds } from '../context/CredsContext'

export const Settings = () => {
    const [theme, setTheme] = useState(false)
    const [mTLS, setMTLS] = useState(false)
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
            const con = await window.electron.invoke('rpc:con')
            const theme = await window.electron.invoke('theme:isdark')

            setTheme(theme)

            setUsername(creds.username)
            setPassword(creds.password)
            setMTLS(con.mtls)
            setHostname(con.host)
            setPort(con.port)
        }

        fetchCreds()
    }, [])

    const handleTheme = () => {
        window.electron.invoke('theme:toggle')
        setTheme(!theme)
    }

    const handleMTLS = () => {
        setMTLS(!mTLS)
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
            const con = {
                mtls: mTLS,
                host: hostname,
                port: port
            }
            window.electron.invoke('rpc:setcon', con)
            setCreds(creds)
            setResult(true)
        }
    }

    return (
        <div className="Settings">
            <Card className="Card">
                <form>
                    <h1>Settings</h1>
                    <div><label>Darkmode:</label><input id="switchTheme" class="switch" type="checkbox" checked={theme} onChange={() => handleTheme()}></input><label className="switch-label" htmlFor="switchTheme"></label></div>
                    <h3>RPC Credentials:</h3>
                    <div><label>mTLS:</label><input id="switchMTLS" class="switch" type="checkbox" checked={mTLS} onChange={() => handleMTLS()}></input><label className="switch-label" htmlFor="switchMTLS"></label></div>
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
