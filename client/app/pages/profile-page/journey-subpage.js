import React from 'react'
import PropTypes from 'prop-types'

import SidebarPage from '../../components/sidebar/sidebar-page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'

import IconAirPollution from '../explore-page/icons/air-pollution.svg'
import IconNoise from '../explore-page/icons/noise.svg'

export default class JourneySubpage extends React.Component {

  componentWillMount () {}

  componentWillReceiveProps (nextProps) {
    var curPropAverages = {
      no2: this.props.no2,
      pm10: this.props.pm10,
      pm25: this.props.pm25,
      dBA: this.props.dBA
    }
    var nextPropAverages = {
      no2: nextProps.no2,
      pm10: nextProps.pm10,
      pm25: nextProps.pm25,
      dBA: nextProps.dBA
    }
    if (curPropAverages !== nextPropAverages) {
      nextProps.getAirQualityIndex(nextProps.no2, nextProps.pm25, nextProps.pm10, false)
    }
  }

  componentDidUpdate () {}

  componentWillUnmount () {}

  render () {
    return (
      <SidebarPage title={this.props.title} canGoBack>
        <Section title='Journey Averages'>
          <Card link={``}>
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
                <span>{this.props.no2} µg/m³</span>
              </div>
              <div className='pill'>
                <h2>PM2.5</h2>
                <span>{this.props.pm25} µgm-3</span>
              </div>
              <div className='pill'>
                <h2>PM10</h2>
                <span>{this.props.pm10} µg/m³</span>
              </div>
            </div>
          </Card>
          <Card className='average' link={``}>
            <IconNoise className='icon' />
            <div className='details'>
              <h1>Noise</h1>
              <span className='value'>{this.props.dBA} dBA</span>
            </div>
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}

JourneySubpage.propTypes = {
  title: PropTypes.string,
  // match: PropTypes.object, Use later for path
  airQualityIndex: PropTypes.string,
  pm10: PropTypes.number,
  pm25: PropTypes.number,
  no2: PropTypes.number,
  dBA: PropTypes.number,
  getAirQualityIndex: PropTypes.func
}
