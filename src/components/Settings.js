import {useState} from 'react'
import {Switch} from '@material-ui/core'

const Settings = () => {
    const [theme, setTheme] = useState(window.electron.getTheme().then(theme => theme))

    const handleChange = () => {
        window.electron.setTheme()
        setTheme(!theme)
    }

    return (
        <div>
            <h1>Settings</h1>
            <Switch
                checked={theme}
                onChange={handleChange}
                name="setTheme"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <label>Dark Mode</label>
        </div>
    )
}

export default Settings
