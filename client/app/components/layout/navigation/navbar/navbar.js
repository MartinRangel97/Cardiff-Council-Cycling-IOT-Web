import React from 'react'
import PropTypes from 'prop-types'

import NavbarLinkBtn from './navbar-link-btn'
import NavbarActionBtn from './navbar-action-btn'
import Hamburger from '../hamburger'

import IconLogo from '../../../../icons/logo-gradient.svg'
import IconMap from '../../../../icons/map.svg'
import IconMapGradient from '../../../../icons/map-gradient.svg'
import IconProfile from '../../../../icons/profile.svg'
import IconProfileGradient from '../../../../icons/profile-gradient.svg'
import IconHistory from '../../../../icons/history.svg'
import IconHistoryGradient from '../../../../icons/history-gradient.svg'
import IconSettings from '../../../../icons/settings.svg'

export default class NavBar extends React.Component {
  render () {
    return (
      <div className='navbar'>
        <div className='top'>
          <img className='logo' src={IconLogo} />
          <Hamburger onClick={this.props.sidebarToggle} />
        </div>
        <div className='mid'>
          <NavbarLinkBtn link='/app/explore' name='Explore' icon={IconMap} iconGradient={IconMapGradient} />
          <NavbarLinkBtn link='/app/profile' name='Profile' icon={IconProfile} iconGradient={IconProfileGradient} />
          <NavbarLinkBtn link='/app/history' name='History' icon={IconHistory} iconGradient={IconHistoryGradient} />
        </div>
        <div className='bottom'>
          <NavbarActionBtn icon={IconSettings} />
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  sidebarToggle: PropTypes.func
}
