import NavLink from './NavLink'

const Menu = () => {
    return (
        <div className="Menu">
            <div className="NavLinks">
                <NavLink txt='Home' link='/' />
                <NavLink txt='Send' link='/send'/>
                <NavLink txt='Receive' link='/receive' />
                <NavLink txt='Transactions' link='/transactions' />
            </div>
        </div>
    )
}

export default Menu
