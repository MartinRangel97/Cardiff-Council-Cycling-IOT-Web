import React from 'react'
import PropTypes from 'prop-types'

import SidebarPage from '../../components/sidebar/sidebar-page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'

export default class DetailssPage extends React.Component {
  getLngLat = () => {
    // Get the longitude and latitude from the URL
    let params = new URLSearchParams(this.props.location.search.slice(1))
    return { lng: params.get('lng'), lat: params.get('lat') }
  }

  render () {
    return (
      <SidebarPage title='Details' canGoBack>
        <Section title='Map Location'>
          <Card>
            <h1>Longitude:</h1>
            {this.getLngLat().lng}
            <h1>Latitude:</h1>
            {this.getLngLat().lat}
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}

DetailssPage.propTypes = {
  location: PropTypes.object
}
