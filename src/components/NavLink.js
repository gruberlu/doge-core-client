import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const NavLink = ({txt, link}) => {
    return (
        <div className="NavLink">
            <Link to={link}>
                <button>{txt}</button>
            </Link>
        </div>
    )
}

NavLink.propTypes = {
    txt: PropTypes.string.isRequired
}

export default NavLink
