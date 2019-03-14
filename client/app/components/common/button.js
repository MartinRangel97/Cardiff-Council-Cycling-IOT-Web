import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  // Get the className
  let className = 'btn '
  if (props.danger) className += 'danger '
  if (props.className) className += props.className

  return (
    <button className={className} onClick={props.onClick}>
      {props.text}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  danger: PropTypes.bool
}

export default Button
