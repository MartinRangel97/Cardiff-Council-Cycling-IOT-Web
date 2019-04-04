import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import IconButton from '../common/icon-button'

import IconBack from './icons/back.svg'

class Page extends React.Component {
  close = () => {
    if (this.props.history.length > 1) {
      this.props.history.goBack()
    } else {
      this.props.history.push(this.props.match.path)
    }
  }

  render () {
    return (
      <TransitionGroup>
        <CSSTransition
          key={this.props.location.key}
          classNames='animation'
          timeout={{ enter: 300, exit: 150 }}
          unmountOnExit>
          <Switch location={this.props.location}>
            <Route path={this.props.path}>
              <div className={classNames('page-container', this.props.className)}>
                <div className='page'>
                  <div className={classNames('container', { 'full-width': this.props.fullWidth })}>
                    <div className='modal-header'>
                      {this.props.canGoBack &&
                        <IconButton className='close-btn' title='Back' icon={IconBack} onClick={this.close} />
                      }
                      <h1>{this.props.title}</h1>
                    </div>
                    {this.props.children}
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

Page.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  fullWidth: PropTypes.bool,
  canGoBack: PropTypes.bool,
  path: PropTypes.string,
  children: PropTypes.node,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object
}

// Wrap the component using withRouter so we can access Router features like history.
export default withRouter(Page)
