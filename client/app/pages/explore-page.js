import React from 'react'
import PropTypes from 'prop-types'

import TestModal from '../modals/test-modal'
import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class ExplorePage extends React.Component {
  render () {
    return (
      <SidebarPage title='Explore'>
        <Section title='Test Modal'>
          <Card link='/app/explore/test'>
            <h1>Open Test Modal</h1>
            <h2>Click here to open the test modal.</h2>
          </Card>
        </Section>
        <TestModal path={`${this.props.match.path}/test`} />
      </SidebarPage>
    )
  }
}

ExplorePage.propTypes = {
  match: PropTypes.object
}
