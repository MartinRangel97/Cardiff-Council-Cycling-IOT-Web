import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

const Sidebar = props => {
  return (
    <div className={className('sidebar', { 'hidden': props.showSidebar })}>
      {props.children}
    </div>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node,
  showSidebar: PropTypes.bool
}

export default Sidebar
