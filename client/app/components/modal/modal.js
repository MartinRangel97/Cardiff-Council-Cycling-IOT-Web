import React from 'react'
import PropTypes from 'prop-types'

export default class Modal extends React.Component {
  render () {
    return (
      <div className='modal'>
        <div className='overlay'>
          <div className='container'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node
}
