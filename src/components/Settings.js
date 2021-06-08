import {useState, useEffect} from 'react'
import {Switch, Card, Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

export const Settings = () => {
    const [theme, setTheme] = useState(window.electron.getTheme().then(theme => theme))
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [host, setHost] = useState()
    const [port, setPort] = useState()
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)

    useEffect(() => {
        const fetchCreds = async () => {
            const creds = await window.electron.getCredentials()
            setUsername(creds.username)
            setPassword(creds.password)
            setHost(creds.host)
            setPort(creds.port)
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
        if(username === "" || password === "" || host === "" || port === ""){
            setError(true)
        }
        else {
            const creds = {
                username: username,
                password: password,
                host: host,
                port: port
            }
            window.electron.setCredentials(creds)
            setResult(true)
        }
    }

    return (
        <div className="Settings">
            <Card className="Card">
                <form>
                    <h1>Settings</h1>
                    {/* <Switch
                        checked={theme}
                        onChange={handleChange}
                        name="setTheme"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <label>Dark Mode</label> */}
                    {/* <Inputfield id="username" label="Username" required onChange={(value) => {setUsername(value)}} />
                    <Inputfield id="password" label="Password" type="password" required onChange={(value) => {setPassword(value)}} />
                    <Inputfield id="host" label="Host" required onChange={(value) => {setHost(value)}} />
                    <Inputfield id="port" label="Port" required onChange={(value) => {setPort(value)}} /> */}
                    <div><label>Username:</label><input value={username} required={true} onChange={(e) => {setUsername(e.target.value)}}/></div>
                    <div><label>Password:</label><input value={password} required type="password" onChange={(e) => {setPassword(e.target.value)}}/></div>
                    <div><label>Host:</label><input value={host} required onChange={(e) => {setHost(e.target.value)}}/></div>
                    <div><label>Port:</label><input value={port} required onChange={(e) => {setPort(e.target.value)}}/></div>
                    <button type="submit" onClick={(e) => {submitForm(e)}}>Submit</button>
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
