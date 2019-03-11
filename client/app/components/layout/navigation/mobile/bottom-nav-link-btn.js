import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export default class BottomNavLinkBtn extends React.Component {
  render () {
    return (
      <NavLink className='link-btn' to={this.props.link} onClick={this.props.onClick}>
        <div className='icon-container'>
          <img className='icon centered' src={this.props.icon} />
          <img className='icon gradient centered' src={this.props.iconGradient} />
        </div>
        <div className='name'>{this.props.name}</div>
      </NavLink>
    )
  }
}

BottomNavLinkBtn.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.string,
  iconGradient: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func
}
