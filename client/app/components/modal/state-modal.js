import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import Modal from './modal'

export default class StateModal extends React.Component {
  render () {
    return (
      <div className='modal'>
        <CSSTransition
          in={this.props.show}
          classNames='animation'
          timeout={300}
          unmountOnExit>
          <Modal close={this.props.close}>
            {this.props.children}
          </Modal>
        </CSSTransition>
      </div>
    )
  }
}

StateModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node
}
