import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import Portal from './portal'
import Button from '../common/button'

export default class StateModal extends React.Component {
  getClassName = () => {
    if (this.props.className) {
      return 'overlay-modal ' + this.props.className
    } else {
      return 'overlay-modal'
    }
  }

  render () {
    return (
      <Portal>
        <CSSTransition
          in={this.props.show}
          classNames='animation'
          timeout={300}
          unmountOnExit>
          <div
            className={classNames('confirmation-modal', this.props.className)}
            onClick={(event) => { if (event.target === event.currentTarget) this.props.close() }}>
            <div className='container'>
              <h1>{this.props.title}</h1>
              <h2>{this.props.subheading}</h2>
              <div className='button-container'>
                <Button text='No' danger={this.props.dangerNo} onClick={this.props.onNo} />
                <Button text='Yes' danger={this.props.dangerYes} onClick={this.props.onYes} />
              </div>
            </div>
          </div>
        </CSSTransition>
      </Portal>
    )
  }
}

StateModal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subheading: PropTypes.string,
  onNo: PropTypes.func,
  onYes: PropTypes.func,
  dangerNo: PropTypes.bool,
  dangerYes: PropTypes.bool,
  show: PropTypes.bool,
  close: PropTypes.func
}
