import React from 'react'
import PropTypes from 'prop-types'

export default class Hamburger extends React.Component {
  render () {
    return (
      <div className='hamburger' onClick={this.props.onClick}>
        <div className='hover-circle centered' />
        <div className='stack centered'>
          <div className='line' />
          <div className='line' />
          <div className='line' />
        </div>
      </div>
    )
  }
}

Hamburger.propTypes = {
  onClick: PropTypes.func
}
