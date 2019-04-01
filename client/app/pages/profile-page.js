import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import axios from 'axios'

import SidebarPageManager from '../components/sidebar/sidebar-page-manager'
import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

import IconAirPollution from './explore-page/icons/air-pollution.svg'
import IconNoise from './explore-page/icons/noise.svg'
import IconBike from './settings-page/icons/bike.svg'
import Journey from './profile-page/journey-card';

export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      journeys: [],
      noiseAverage: 0,
      NO2Average: 0,
      PM10Average: 0,
      PM25Average: 0,
      airQualityIndex: 'N/A'
    }
  }

  componentWillMount () {
    // testing the functions
    this.getJourneys(1)
    this.getTotalAverages(1)
    this.getJourneyMonth(1)
    this.getJourneyDay(1)
    this.getJourneyStartTime(1)
    this.getJourneyEndTime(1)
  }

  getJourneys = (userId) => {
    axios.get('/api/web/' + userId + '/journeys')
      .then((response) => {
        this.setState({
          journeys: response.data
        })
        console.log(this.state.journeys)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getTotalAverages = (userId) => {
    axios.get('/api/web/' + userId + '/measurements')
      .then((response) => {
        this.setState({
          noiseAverage: response.data.dBA.toFixed(0),
          NO2Average: response.data.NO2.toFixed(0),
          PM10Average: response.data.PM10.toFixed(0),
          PM25Average: response.data.PM25.toFixed(0)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
x
  // Statistics
  getTotalDistanceTravelled = (journey) => {}

  // Trips
  getJourneyMonth = (journey) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    let month = months[new Date(journey.startTime).getMonth()]
    return month
  }

  getJourneyDay = (journey) => {
    return new Date(journey.startTime).getDate()
  }

  getJourneyStartTime = (journey) => {
    return new Date(journey.startTime).getHours().toString().concat(':', new Date(journey.startTime).getMinutes().toString())
  }

  getJourneyEndTime = (journey) => {
    return new Date(journey.endTime).getHours() + ':' + new Date(journey.endTime).getMinutes()
  }

  getJourneyDistance = (journeyId) => {}

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
            <Section title='Your Statistics'>
              <Card className='average' link={``}>
                <IconBike className='icon' />
                <div className='details'>
                  <h1>Total Distance Travelled</h1>
                  <span className='value'>23 Miles</span>
                </div>
              </Card>
              <Card link={`${this.props.match.path}/averages/air`}>
                <div className='average'>
                  <IconAirPollution className='icon' />
                  <div className='details'>
                    <h1>Average Air Pollution Exposure</h1>
                    <span className='value'>{this.state.airQualityIndex}</span>
                  </div>
                </div>
                <div className='pill-container'>
                  <div className='pill'>
                    <h2>NO2</h2>
                    <span>{this.state.NO2Average} µg/m³</span>
                  </div>
                  <div className='pill'>
                    <h2>PM2.5</h2>
                    <span>{this.state.PM25Average} µgm-3</span>
                  </div>
                  <div className='pill'>
                    <h2>PM10</h2>
                    <span>{this.state.PM10Average} µg/m³</span>
                  </div>
                </div>
              </Card>
              <Card className='average' link={``}>
                <IconNoise className='icon' />
                <div className='details'>
                  <h1>Average Noise Pollution Exposure</h1>
                  <span className='value'>{this.state.noiseAverage} dBA</span>
                </div>
              </Card>
            </Section>
            <Section title='Your Trips'>
              {this.state.journeys.map((journey, i) =>
                <Journey
                  key={i}
                  link={'/journey/' + i}
                  day={this.getJourneyDay(journey)}
                  month={this.getJourneyMonth(journey)}
                  startTime={this.getJourneyStartTime(journey)}
                  endTime={this.getJourneyEndTime(journey)}
                  distanceTravelled={'5'}
                />
              )}
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
