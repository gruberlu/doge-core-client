import NavLink from './NavLink'

const Menu = () => {
    return (
        <div className="Menu">
            <div className="NavLinks">
                <NavLink txt='Home' />
                <NavLink txt='Send' />
                <NavLink txt='Receive' />
                <NavLink txt='Transactions' />
            </div>
        </div>
    )
}

export default Menu
