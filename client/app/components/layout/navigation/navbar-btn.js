import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export default class NavBarBtn extends React.Component {
  render () {
    return (
      <NavLink to={this.props.link} className='btn'>
        <div className='selection-indicator' />
        <div className='container'>
          <div className='hover-circle centered' />
          <img className='icon centered' src={this.props.icon} />
          <img className='icon gradient centered' src={this.props.iconGradient} />
        </div>
      </NavLink>
    )
  }
}

NavBarBtn.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.string,
  iconGradient: PropTypes.string
}
