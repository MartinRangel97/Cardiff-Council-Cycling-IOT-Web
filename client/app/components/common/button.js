import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

const Button = props => {
  return (
    <button className={className('btn', props.className, { 'danger': props.danger })} onClick={props.onClick}>
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
