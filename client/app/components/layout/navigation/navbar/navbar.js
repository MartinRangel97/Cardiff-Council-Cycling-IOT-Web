import React from 'react'

import NavbarLinkBtn from './navbar-link-btn'
import NavbarActionBtn from './navbar-action-btn'

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
        </div>
        <div className='mid'>
          <NavbarLinkBtn link='/app/explore' icon={IconMap} iconGradient={IconMapGradient} />
          <NavbarLinkBtn link='/app/profile' icon={IconProfile} iconGradient={IconProfileGradient} />
          <NavbarLinkBtn link='/app/history' icon={IconHistory} iconGradient={IconHistoryGradient} />
        </div>
        <div className='bottom'>
          <NavbarActionBtn icon={IconSettings} />
        </div>
      </div>
    )
  }
}
