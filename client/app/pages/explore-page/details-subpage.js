import React from 'react'
import PropTypes from 'prop-types'

import SidebarPage from '../../components/sidebar/sidebar-page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'

import IconAirPollution from './icons/air-pollution.svg'
import IconNoise from './icons/noise.svg'

export default class DetailssPage extends React.Component {
  getLngLat = () => {
    // Get the longitude and latitude from the URL
    let params = new URLSearchParams(this.props.location.search.slice(1))
    return { lng: params.get('lng'), lat: params.get('lat') }
  }

  componentWillMount () {
    // Set the radius
    this.props.setRadius(this.getLngLat())
    console.log(this.props.airQualityIndex)
    this.props.getAirQualityIndex(this.props.circleAverages.NO2, this.props.circleAverages.PM10, this.props.circleAverages.PM25)
    console.log('props details: ' + this.props.circleAverages.NO2, this.props.circleAverages.PM10, this.props.circleAverages.PM25)
  }

  componentDidUpdate (prevProps) {
    // If the location changed (new coordinates), update the radius
    if (prevProps.location !== this.props.location) {
      this.props.setRadius(this.getLngLat())
    }
  }

  componentWillUnmount () {
    // Remove the radius
    this.props.setRadius(null)
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
        <Section title='Area 24 Hour Averages'>
          <Card>
            <div className='average'>
              <IconAirPollution className='icon' />
              <div className='details'>
                <h1>Air Pollution</h1>
                <span className='value'>{this.props.airQualityIndex}</span>
              </div>
            </div>
            <div className='pill-container'>
              <div className='pill'>
                <h2>NO2</h2>
                {console.log('render: ' + this.props.circleAverages.NO2)}
                <span>{this.props.circleAverages.NO2} µg/m³</span>
              </div>
              <div className='pill'>
                <h2>PM2.5</h2>
                <span>{this.props.circleAverages.PM25} µgm-3</span>
              </div>
              <div className='pill'>
                <h2>PM10</h2>
                <span>{this.props.circleAverages.PM10} µg/m³</span>
              </div>
            </div>
          </Card>
          <Card className='average' link={``}>
            <IconNoise className='icon' />
            <div className='details'>
              <h1>Noise</h1>
              <span className='value'>{this.props.circleAverages.dB} dBA</span>
            </div>
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}

DetailssPage.propTypes = {
  location: PropTypes.object,
  setRadius: PropTypes.func,
  circleAverages: PropTypes.object,
  getAirQualityIndex: PropTypes.func,
  airQualityIndex: PropTypes.string
}
