import React from 'react'
import PropTypes from 'prop-types'

export default class IconButton extends React.Component {
  getClassName = () => {
    if (this.props.className) {
      return 'icon-btn ' + this.props.className
    } else {
      return 'icon-btn'
    }
  }

  render () {
    return (
      <a className='close-btn icon-btn' onClick={this.props.onClick}>
        <div className='hover-circle' />
        <img className='icon' alt={this.props.alt} src={this.props.img} />
      </a>
    )
  }
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  img: PropTypes.string,
  alt: PropTypes.string
}
