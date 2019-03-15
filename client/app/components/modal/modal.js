import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../common/icon-button'

import IconBack from '../../icons/back.svg'

const Modal = props => {
  return (
    <div className='overlay' onClick={(event) => { if (event.target === event.currentTarget) props.close() }}>
      <div className='modal-container'>
        <div className='modal-header'>
          <IconButton className='close-btn' title='Back' icon={IconBack} onClick={props.close} />
          <h1>
            {props.title}
          </h1>
        </div>
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func,
  children: PropTypes.node
}

export default Modal
