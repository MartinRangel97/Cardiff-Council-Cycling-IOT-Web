import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

export default class NavbarLinkBtn extends React.Component {
  render () {
    return (
      <NavLink
        to={this.props.link}
        className={classNames('link-btn', { 'rotate': this.props.rotateEffect })}
        name={this.props.name}
        onClick={this.props.onClick}>
        <div className='selection-indicator' />
        <div className='container'>
          <div className='hover-circle centered' />
          <this.props.icon className='icon centered' />
          <this.props.iconGradient className='icon gradient centered' />
        </div>
      </NavLink>
    )
  }
}

NavbarLinkBtn.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  rotateEffect: PropTypes.bool
}
