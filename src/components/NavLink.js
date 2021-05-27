import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const NavLink = ({txt, link, icon}) => {
    return (
            <Link to={link} className="NavLink" id={txt}>
                {icon}
            </Link>
    )
}

NavLink.propTypes = {
    txt: PropTypes.string.isRequired
}

export default NavLink
