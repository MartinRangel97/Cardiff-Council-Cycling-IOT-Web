import React from 'react'
import PropTypes from 'prop-types'

const IconButton = props => {
  return (
    <a className={`icon-btn ${props.className ? props.className : ''}`} onClick={props.onClick}>
      <div className='hover-circle' />
      <img className='icon' alt={props.alt} src={props.img} />
    </a>
  )
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  img: PropTypes.string,
  alt: PropTypes.string
}

export default IconButton
