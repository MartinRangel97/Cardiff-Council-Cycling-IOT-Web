import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import Portal from './portal'
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
      <Portal>
        <div className={this.getClassName()}>
          <CSSTransition
            in={this.props.show}
            classNames='animation'
            timeout={300}
            unmountOnExit>
            <Modal title={this.props.title} close={this.props.close}>
              {this.props.children}
            </Modal>
          </CSSTransition>
        </div>
      </Portal>
    )
  }
}

StateModal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  show: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node
}
