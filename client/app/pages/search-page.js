import React from 'react'
import PropTypes from 'prop-types'

import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class SearchPage extends React.Component {
  getQuery = () => {
    return new URLSearchParams(this.props.location.search.slice(1))
      .get('query')
  }

  render () {
    return (
      <SidebarPage title='Search' canGoBack>
        <Section title={'Results for ' + this.getQuery()}>
          <Card>
            In Development
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}

SearchPage.propTypes = {
  location: PropTypes.object
}
