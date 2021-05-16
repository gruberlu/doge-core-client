import PropTypes from 'prop-types'

const NavLink = ({txt}) => {
    return (
        <div className="NavLink">
            <button>{txt}</button>
        </div>
    )
}

NavLink.propTypes = {
    txt: PropTypes.string.isRequired
}

export default NavLink
