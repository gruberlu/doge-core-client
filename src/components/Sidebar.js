import NavLink from './NavLink'
import * as Icons from '@material-ui/icons'

const Menu = () => {
    return (
        <div className="Sidebar">
            <div className="NavLinks">
                <NavLink txt='home' link='/' icon={<Icons.Home />} />
                <NavLink txt='send' link='/send'icon={<Icons.CallMade />} />
                <NavLink txt='receive' link='/receive' icon={<Icons.CallReceived />} />
                <NavLink txt='transactions' link='/transactions' icon={<Icons.SyncAlt />} />
                <NavLink txt='settings' link='/settings' icon={<Icons.Settings />} />
            </div>
            <button onClick={(e) => {
                e.preventDefault()
                console.log('info')
            }}>
                <Icons.Info className="info" />
            </button>
        </div>
    )
}

export default Menu
