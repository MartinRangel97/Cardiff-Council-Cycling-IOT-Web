import React from 'react'
import PropTypes from 'prop-types'

import NavBar from './navigation/navbar/navbar'
import MobileActionBar from './navigation/mobile-action-bar'
import MobileBottomNav from './navigation/mobile-bottom-nav-bar'

export default class Layout extends React.Component {
  render () {
    return (
      <div className='layout'>
        <NavBar />
        <MobileActionBar />
        <div className='content'>
          {this.props.children}
        </div>
        <MobileBottomNav />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
}
