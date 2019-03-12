import React from 'react'
import PropTypes from 'prop-types'

import IconBack from '../../icons/back.svg'

export default class Modal extends React.Component {
  overlayClick = (event) => {
    if (event.target === event.currentTarget) this.props.close()
  }

  render () {
    return (
      <div className='overlay' onClick={this.overlayClick}>
        <div className='modal-container'>
          <div className='modal-header'>
            <a className='close-btn icon-btn' alt='Back' onClick={this.props.close}>
              <div className='hover-circle' />
              <img className='icon' src={IconBack} />
            </a>
            <h1>
              {this.props.title}
            </h1>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func,
  children: PropTypes.node
}
