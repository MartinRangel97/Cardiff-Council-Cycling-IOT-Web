import React from 'react'
import PropTypes from 'prop-types'

import SidebarPage from '../../components/sidebar/sidebar-page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'

import axios from 'axios'

import IconAirPollution from '../explore-page/icons/air-pollution.svg'
import IconNoise from '../explore-page/icons/noise.svg'

export default class JourneySubpage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dBA: 0,
      no2: 0,
      pm10: 0,
      pm25: 0
    }
  }

  getJourneyId = () => {
    let journeyId = window.location.pathname.split('/').slice(-1)[0]
    return journeyId
  }

  componentWillMount () {
    this.props.setJourneyMap(this.getJourneyId(), this.getJourneyId())
    this.getJourneyReadings(1, this.getJourneyId()).then(() => {
      // Gets AQI after getting all averages in the state
      this.props.getAirQualityIndex(this.state.no2, this.state.pm25, this.state.pm10, false)
    })
  }

  componentDidMount () {}

  componentDidUpdate () {}

  componentWillUnmount () {}

  getJourneyReadings = (userId, journeyId) => {
    return axios.get('/api/web/user/journeys/' + journeyId + '/readings/averages')
      .then((response) => {
        if (response.data !== 'NaN') {
          this.setState({
            dBA: response.data.dBA.toFixed(0),
            no2: response.data.NO2.toFixed(0),
            pm10: response.data.PM10.toFixed(0),
            pm25: response.data.PM25.toFixed(0)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <SidebarPage title='Details'canGoBack>
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
                <span>{this.state.no2} µg/m³</span>
              </div>
              <div className='pill'>
                <h2>PM2.5</h2>
                <span>{this.state.pm25} µg/m³</span>
              </div>
              <div className='pill'>
                <h2>PM10</h2>
                <span>{this.state.pm10} µg/m³</span>
              </div>
            </div>
          </Card>
          <Card className='average' link={``}>
            <IconNoise className='icon' />
            <div className='details'>
              <h1>Noise</h1>
              <span className='value'>{this.state.dBA} dB</span>
            </div>
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}

JourneySubpage.propTypes = {
  // match: PropTypes.object, Use later for path
  airQualityIndex: PropTypes.string,
  setJourneyMap: PropTypes.func,
  getAirQualityIndex: PropTypes.func
}
