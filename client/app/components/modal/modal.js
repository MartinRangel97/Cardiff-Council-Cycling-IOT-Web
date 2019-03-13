import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../common/icon-button'

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
            <IconButton className='close-btn' alt='Back' img={IconBack} onClick={this.props.close} />
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
