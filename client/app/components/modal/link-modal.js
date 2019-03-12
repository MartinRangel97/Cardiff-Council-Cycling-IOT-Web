import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Modal from './modal'

export default class LinkModal extends React.Component {
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
        <Route render={({ location, history }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames='animation'
              timeout={300}
              unmountOnExit>
              <Switch location={location}>
                <Route path={this.props.path}>
                  <Modal close={history.goBack}>
                    {this.props.children}
                  </Modal>
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </div>
    )
  }
}

LinkModal.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.node
}
