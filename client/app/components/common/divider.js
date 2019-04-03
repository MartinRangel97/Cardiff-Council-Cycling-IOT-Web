import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

const Divider = props => {
  return (
    <div className={className('divider ', props.className)} />
  )
}

Divider.propTypes = {
  className: PropTypes.string
}

export default Divider
