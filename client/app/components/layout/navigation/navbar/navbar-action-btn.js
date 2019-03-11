import React from 'react'
import PropTypes from 'prop-types'

export default class NavbarActionBtn extends React.Component {
  render () {
    return (
      <a onClick={this.props.onClick} className='action-btn'>
        <div className='hover-circle centered' />
        <img className='icon centered' src={this.props.icon} />
      </a>
    )
  }
}

NavbarActionBtn.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func
}
