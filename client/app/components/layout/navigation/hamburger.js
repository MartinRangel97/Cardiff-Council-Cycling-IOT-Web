import React from 'react'
import PropTypes from 'prop-types'

export default class Hamburger extends React.Component {
  render () {
    return (
      <a className='action-btn sidebar-btn' onClick={this.props.onClick} >
        <div className='hover-circle centered' />
        <div className='hamburger centered'>
          <div className='line' />
          <div className='line' />
          <div className='line' />
        </div>
      </a>
    )
  }
}

Hamburger.propTypes = {
  onClick: PropTypes.func
}
