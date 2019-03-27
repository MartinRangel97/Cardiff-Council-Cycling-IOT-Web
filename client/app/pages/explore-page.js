import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import SidebarPageManager from '../components/sidebar/sidebar-page-manager'
import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

import DetailsSubpage from './explore-page/details-subpage'

import IconAirPollution from './explore-page/icons/air-pollution.svg'
import IconNoise from './explore-page/icons/noise.svg'

export default class ExplorePage extends React.Component {
  componentDidUpdate (prevProps) {
    // If the map was clicked, show the details page
    if (prevProps.mapState !== this.props.mapState) {
      if (this.props.mapState.clickLocation) {
        this.props.history.push({
          pathname: `${this.props.match.path}/details`,
          search: '?lng=' + this.props.mapState.clickLocation.lng + '&' +
            'lat=' + this.props.mapState.clickLocation.lat
        })
      }
    }
  }

  measurements () {
    var request = new XMLHttpRequest()
    request.open('GET', '/api/web/measurements', true)
    console.log(request.status)
    request.onload = (data) => {
      console.log(request.status)
      if (request.status === 200) {
        console.log(request.response)
      } else {
        console.log('Failed')
      }
    }
    request.send(null)
  }

  render () {
    this.measurements()
    return (
      <SidebarPageManager>
        <Route path={`${this.props.match.path}/details`} component={DetailsSubpage} />
        <Route path={`${this.props.match.path}/`} render={() =>
          <SidebarPage title='Explore'>
            <Section title='24 Hour Averages'>
              <Card className='average' link={`${this.props.match.path}/averages/air`}>
                <IconAirPollution className='icon' />
                <div className='details'>
                  <h1>Air Pollution</h1>
                  <span className='value'>Moderate</span>
                </div>
              </Card>
              <Card className='average' link={`${this.props.match.path}/averages/noise`}>
                <IconNoise className='icon' />
                <div className='details'>
                  <h1>Noise</h1>
                  <span className='value'>58 dB</span>
                </div>
              </Card>
            </Section>
            <Section title='More Details'>
              <Card>
                <h1>Want to see more details?</h1>
                <h2>Click the map to view more detailed readings for a location.</h2>
              </Card>
            </Section>
          </SidebarPage>
        } />
      </SidebarPageManager>
    )
  }
}

ExplorePage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  mapState: PropTypes.object
}
