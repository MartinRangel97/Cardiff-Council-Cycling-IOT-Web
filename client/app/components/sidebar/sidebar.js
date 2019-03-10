import React from 'react'
import PropTypes from 'prop-types'

export default class Sidebar extends React.Component {
  getSidebarClassName () {
    if (this.props.showSidebar) {
      return 'sidebar'
    } else {
      return 'sidebar hidden'
    }
  }

  render () {
    return (
      <div className={this.getSidebarClassName()}>
        {this.props.children}
      </div>
    )
  }
}

Sidebar.propTypes = {
  children: PropTypes.node,
  showSidebar: PropTypes.bool
}
