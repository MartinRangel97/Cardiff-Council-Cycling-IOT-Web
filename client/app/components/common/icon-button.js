import React from 'react'
import PropTypes from 'prop-types'

const IconButton = props => {
  return (
    <a
      className={`icon-btn ${props.className ? props.className : ''}`}
      onClick={props.onClick}
      title={props.title}>
      <div className='hover-circle' />
      <props.icon className='icon' />
    </a>
  )
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string
}

export default IconButton
