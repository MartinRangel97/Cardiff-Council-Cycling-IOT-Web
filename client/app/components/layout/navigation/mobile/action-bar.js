import React from 'react'
import PropTypes from 'prop-types'

import Hamburger from '../hamburger'
import NavbarActionBtn from '../action-btn'

import IconSettings from '../../../../icons/settings.svg'

export default class ActionBar extends React.Component {
  render () {
    return (
      <div className='mobile-action-bar'>
        <div className='left'>
          <Hamburger onClick={this.props.sidebarToggle} />
        </div>
        <div className='right'>
          <NavbarActionBtn icon={IconSettings} />
        </div>
      </div>
    )
  }
}

ActionBar.propTypes = {
  sidebarToggle: PropTypes.func
}
