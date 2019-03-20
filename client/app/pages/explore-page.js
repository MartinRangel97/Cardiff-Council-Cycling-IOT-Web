import React from 'react'
import PropTypes from 'prop-types'

import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

import IconAirPollution from './explore-page/icons/air-pollution.svg'
import IconNoise from './explore-page/icons/noise.svg'

export default class ExplorePage extends React.Component {
  render () {
    return (
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
    )
  }
}

ExplorePage.propTypes = {
  match: PropTypes.object
}
