import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Modal from './modal'

export default class LinkModal extends React.Component {
  static contextTypes = {
    router: () => true
  }

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
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames='animation'
              timeout={300}
              unmountOnExit>
              <Switch location={location}>
                <Route path={this.props.route}>
                  <Modal close={this.context.router.history.goBack}>
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
  route: PropTypes.string,
  children: PropTypes.node
}
