import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

export default class ActionBtn extends React.Component {
  render () {
    if (this.props.link) {
      return (
        <Link to={this.props.link} className='action-btn'>
          <div className='hover-circle centered' />
          <this.props.icon className='icon centered' />
        </Link>
      )
    } else {
      return (
        <a onClick={this.props.onClick} className='action-btn'>
          <div className='hover-circle centered' />
          <this.props.icon className='icon centered' />
        </a>
      )
    }
  }
}

ActionBtn.propTypes = {
  onClick: PropTypes.func,
  link: PropTypes.string
}
