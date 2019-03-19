import React from 'react'

import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class HistoryPage extends React.Component {
  render () {
    return (
      <SidebarPage title='History'>
        <Section title='Hello World'>
          <Card>
            <h1>History Will Go Here</h1>
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}
