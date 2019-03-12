import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import TestModal from '../modals/test-modal'

export default class ExplorePage extends React.Component {
  render () {
    return (
      <div className='sidebar-page explore-page'>
        <h1>Explore</h1>
        <h2>Test Modal</h2>
        <NavLink to='/app/explore/test'>
          Open Test Modal
        </NavLink>
        <TestModal path={`${this.props.match.path}/test`} />
      </div>
    )
  }
}

ExplorePage.propTypes = {
  match: PropTypes.object
}
