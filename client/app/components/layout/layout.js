import React from 'react'
import PropTypes from 'prop-types'

import NavBar from './navigation/navbar/navbar'
import ActionBar from './navigation/mobile/action-bar'
import BottomNav from './navigation/mobile/bottom-nav-bar'

export default class Layout extends React.Component {
  render () {
    return (
      <div className='layout'>
        <NavBar sidebarToggle={this.props.sidebarToggle} settingsToggle={this.props.settingsToggle} />
        <ActionBar sidebarToggle={this.props.sidebarToggle} settingsToggle={this.props.settingsToggle} />
        <div className='content'>
          {this.props.children}
        </div>
        <BottomNav />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  sidebarToggle: PropTypes.func,
  settingsToggle: PropTypes.func
}
