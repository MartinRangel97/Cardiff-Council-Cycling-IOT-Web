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
      NO2Average: 0
    }
  }

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

  getNoiseAverage = () => {
    axios.get('/api/web/noiseAverage')
      .then((response) => {
        console.log('Noise' + response.data)
        this.setState({
          noiseAverage: response.data.toFixed(0)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getNO2Average = () => {
    axios.get('/api/web/NO2Average')
      .then((response) => {
        console.log('NO2 ' + response.data)
        this.setState({
          noiseAverage: response.data.toFixed(0)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentWillMount () {
    this.getNoiseAverage()
    this.getNO2Average()
  }

  render () {
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
                  <span className='value'>{this.state.noiseAverage} dB</span>
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
