import Link from './Link'
import * as Icons from '@material-ui/icons'

export const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="NavLinks">
                <Link txt='home' activeClassName="active" link='/' icon={<Icons.Home />} />
                <Link txt='send' activeClassName="active" link='/send' icon={<Icons.CallMade />} />
                <Link txt='receive' activeClassName="active" link='/receive' icon={<Icons.CallReceived />} />
                <Link txt='transactions' activeClassName="active" link='/transactions' icon={<Icons.SyncAlt />} />
                <Link txt='settings' activeClassName="active" link='/settings' icon={<Icons.Settings />} />
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
