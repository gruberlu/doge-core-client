import {useState} from 'react'
import {Switch, Card} from '@material-ui/core'

export const Settings = () => {
    const [theme, setTheme] = useState(window.electron.getTheme().then(theme => theme))

    const handleChange = () => {
        window.electron.setTheme()
        setTheme(!theme)
    }

    return (
        <div>
            <Card className="Card">
                <h1>Settings</h1>
                <Switch
                    checked={theme}
                    onChange={handleChange}
                    name="setTheme"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <label>Dark Mode</label>
            </Card>
        </div>
    )
}
