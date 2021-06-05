import NavLink from './NavLink'
import * as Icons from '@material-ui/icons'

export const Sidebar = () => {
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
                const infoCard = document.querySelector(".InfoCard")
                infoCard.classList.toggle("hidden")
            }}>
                <Icons.Info className="info" />
            </button>
        </div>
    )
}
