import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import SidebarPageManager from '../components/sidebar/sidebar-page-manager'
import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class ProfilePage extends React.Component {
  render () {
    return (
      <SidebarPageManager>
        <Route path={`${this.props.match.path}/subpage`} render={() =>
          <SidebarPage title='Subpage Example' canGoBack>
            <Section title='About'>
              <Card>
                <h1>This is an Example Subpage</h1>
                <h2>Click the back button to go back to the explore page.</h2>
              </Card>
            </Section>
          </SidebarPage>
        } />
        <Route path={`${this.props.match.path}/`} render={() =>
          <SidebarPage title='Profile'>
            <Section title='Your Trips'>
              <Card link={`${this.props.match.path}/subpage`}>
                <h1>Open Subpage Example</h1>
                <h2>Click here to open the subpage example.</h2>
              </Card>
            </Section>
          </SidebarPage>
        } />
      </SidebarPageManager>
    )
  }
}

ProfilePage.propTypes = {
  match: PropTypes.object
}
