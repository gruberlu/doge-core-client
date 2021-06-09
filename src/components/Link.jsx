import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

const Link = ({txt, link, icon, activeClassName}) => {
    return (
        <NavLink to={link} exact activeClassName={activeClassName} className="NavLink" id={txt}>
            {icon}
        </NavLink>
    )
}

Link.propTypes = {
    txt: PropTypes.string.isRequired
}

export default Link
