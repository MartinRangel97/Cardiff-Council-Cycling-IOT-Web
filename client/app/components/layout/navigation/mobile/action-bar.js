import React from 'react'
import PropTypes from 'prop-types'

import Hamburger from '../hamburger'
import ActionBtn from '../action-btn'

import IconSettings from './icons/settings.svg'
import IconLogout from './icons/logout.svg'

export default class ActionBar extends React.Component {
  render () {
    return (
      <div className='action-bar'>
        <div className='left'>
          <Hamburger onClick={this.props.sidebarToggle} />
        </div>
        <div className='right'>
          <ActionBtn icon={IconSettings} link='/app/settings' />
          <ActionBtn icon={IconLogout} onClick={this.props.logout} />
        </div>
      </div>
    )
  }
}

ActionBar.propTypes = {
  sidebarToggle: PropTypes.func,
  logout: PropTypes.func
}
