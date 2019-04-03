import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

const IconButton = props => {
  return (
    <a
      className={className('icon-btn', props.className)}
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

export default IconButton
