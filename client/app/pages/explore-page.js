import React from 'react'

import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class ExplorePage extends React.Component {
  render () {
    return (
      <SidebarPage title='Explore'>
        <Section title='Test Page'>
          <Card link='/app/explore/test'>
            <h1>Open Test Page</h1>
            <h2>Click here to open the test page.</h2>
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}
