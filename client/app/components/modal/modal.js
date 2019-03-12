import React from 'react'
import PropTypes from 'prop-types'

export default class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.overlayClick = this.overlayClick.bind(this)
  }

  overlayClick (event) {
    if (event.target === event.currentTarget) this.props.close()
  }

  render () {
    return (
      <div className='overlay' onClick={this.overlayClick}>
        <div className='modal-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  close: PropTypes.func,
  children: PropTypes.node
}
