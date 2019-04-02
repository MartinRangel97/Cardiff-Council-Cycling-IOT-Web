import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import axios from 'axios'

import SidebarPageManager from '../components/sidebar/sidebar-page-manager'
import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'

import DetailsSubpage from './explore-page/details-subpage'

import IconAirPollution from './explore-page/icons/air-pollution.svg'
import IconNoise from './explore-page/icons/noise.svg'

export default class ExplorePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      noiseAverage: 0,
      NO2Average: 0,
      PM10Average: 0,
      PM25Average: 0
    }
  }

  componentWillMount () {
    this.getNoiseAverage()
    this.getNO2Average()
    this.getPM10Average()
    this.getPM25Average()
    this.props.getAirQualityIndex(this.state.NO2Average, this.state.PM10Average, this.state.PM25Average)
  }

  componentDidUpdate (prevProps) {
    // If the map was clicked, show the details page
    if (prevProps.mapState !== this.props.mapState) {
      if (this.props.mapState.clickLocation) {
        this.props.getCircleAverage(this.props.mapState.clickLocation.lat, this.props.mapState.clickLocation.lng, 1)
        this.props.history.push({
          pathname: `${this.props.match.path}/details`,
          search: '?lng=' + this.props.mapState.clickLocation.lng + '&' +
            'lat=' + this.props.mapState.clickLocation.lat
        })
      }
    }
  }

  getNoiseAverage = () => {
    axios.get('/api/web/noiseAverage')
      .then((response) => {
        if (response.data !== 'NaN') {
          this.setState({
            noiseAverage: response.data.toFixed(0)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getNO2Average = () => {
    axios.get('/api/web/NO2Average')
      .then((response) => {
        if (response.data !== 'NaN') {
          this.setState({
            NO2Average: response.data.toFixed(0)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getPM10Average = () => {
    axios.get('/api/web/PM10Average')
      .then((response) => {
        if (response.data !== 'NaN') {
          this.setState({
            PM10Average: response.data.toFixed(0)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getPM25Average = () => {
    axios.get('/api/web/PM25Average')
      .then((response) => {
        if (response.data !== 'NaN') {
          this.setState({
            PM25Average: response.data.toFixed(0)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <SidebarPageManager>
        <Route path={`${this.props.match.path}/details`} render={(props) =>
          <DetailsSubpage {...props} setRadius={this.props.setMapCurrentRadius} circleAverages={this.props.circleAverages} />
        } />
        <Route path={`${this.props.match.path}/`} render={() =>
          <SidebarPage title='Explore'>
            <Section title='24 Hour Averages'>
              <Card link={`${this.props.match.path}/averages/air`}>
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
              <Card className='average' link={`${this.props.match.path}/averages/noise`}>
                <IconNoise className='icon' />
                <div className='details'>
                  <h1>Noise</h1>
                  <span className='value'>{this.state.noiseAverage} dBA</span>
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
  mapState: PropTypes.object,
  setMapCurrentRadius: PropTypes.func,
  getCircleAverage: PropTypes.func,
  getAirQualityIndex: PropTypes.func,
  airQualityIndex: PropTypes.string,
  circleAverages: PropTypes.object
}
