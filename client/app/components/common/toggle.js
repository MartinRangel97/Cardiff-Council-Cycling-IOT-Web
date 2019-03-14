import React from 'react'
import PropTypes from 'prop-types'

const Toggle = props => {
  return (
    <label className='toggle'>
      <input type='checkbox'
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onClick={props.onClick}
        onChange={props.onChange} />
      <div className='slider'>
        <div className='gradient' />
        <div className='switch' />
      </div>
    </label>
  )
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onClick: PropTypes.onClick,
  onChange: PropTypes.onChange
}

export default Toggle
