import React from 'react'
import PropTypes from 'prop-types'

import TestModal from '../modals/test-modal'
import Card from '../components/common/card'

export default class ExplorePage extends React.Component {
  render () {
    return (
      <div className='sidebar-page explore-page'>
        <h1>Explore</h1>
        <h2>Test Modal</h2>
        <Card link='/app/explore/test'>
          Click this card to open the test modal.
        </Card>
        <TestModal path={`${this.props.match.path}/test`} />
      </div>
    )
  }
}

ExplorePage.propTypes = {
  match: PropTypes.object
}
