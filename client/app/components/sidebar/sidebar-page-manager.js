import React from 'react'
import PropTypes from 'prop-types'
import { Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const SidebarPageManager = props => {
  // Ignore link modal changes
  var key = props.location.pathname.split('/')[props.pathLevel]

  return (
    <TransitionGroup>
      <CSSTransition
        key={key}
        classNames='sidebar-fade-animation'
        timeout={150}>
        <Switch location={props.location}>
          {props.children}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

SidebarPageManager.propTypes = {
  pathLevel: PropTypes.number,
  location: PropTypes.object,
  children: PropTypes.node
}

export default withRouter(SidebarPageManager)
