import React from 'react'
import PropTypes from 'prop-types'

export default class ActionBtn extends React.Component {
  render () {
    return (
      <a onClick={this.props.onClick} className='action-btn'>
        <div className='hover-circle centered' />
        <this.props.icon className='icon centered' />
      </a>
    )
  }
}

ActionBtn.propTypes = {
  onClick: PropTypes.func
}
