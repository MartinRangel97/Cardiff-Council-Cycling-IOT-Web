import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import Modal from './modal'

export default class StateModal extends React.Component {
  getClassName = () => {
    if (this.props.className) {
      return 'modal ' + this.props.className
    } else {
      return 'modal'
    }
  }

  render () {
    return (
      <div className={this.getClassName()}>
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
  className: PropTypes.string,
  show: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node
}
