import React from 'react'

import NavBarBtn from './navbar-btn'

import IconLogo from '../../../icons/logo-gradient.svg'
import IconMap from '../../../icons/map.svg'
import IconMapGradient from '../../../icons/map-gradient.svg'
import IconProfile from '../../../icons/profile.svg'
import IconProfileGradient from '../../../icons/profile-gradient.svg'
import IconHistory from '../../../icons/history.svg'
import IconHistoryGradient from '../../../icons/history-gradient.svg'

export default class NavBar extends React.Component {
  render () {
    return (
      <div className='navbar'>
        <div className='top'>
          <img className='logo' src={IconLogo} />
        </div>
        <div className='mid'>
          <NavBarBtn link='/app/explore' icon={IconMap} iconGradient={IconMapGradient} />
          <NavBarBtn link='/app/profile' icon={IconProfile} iconGradient={IconProfileGradient} />
          <NavBarBtn link='/app/history' icon={IconHistory} iconGradient={IconHistoryGradient} />
        </div>
        <div className='bottom'>
          Bottom
        </div>
      </div>
    )
  }
}
