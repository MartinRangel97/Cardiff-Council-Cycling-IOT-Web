import React from 'react'
import PropTypes from 'prop-types'
import { Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const SidebarPageManager = props => {
  // Get the current page from the URL
  let currentPage = props.location.pathname
    .replace(props.match.path, '')
    .split('/')[1]

  return (
    <TransitionGroup className='sidebar-page-manager'>
      <CSSTransition
        key={currentPage}
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
  match: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node
}

export default withRouter(SidebarPageManager)
