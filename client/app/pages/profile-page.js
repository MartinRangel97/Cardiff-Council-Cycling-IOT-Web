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

export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      journeys: []
    }
  }

  componentWillMount () {
    this.setState({
      journeys: this.getJourneys(1)
    }, () => {
      console.log(this.state.journeys[0])
      console.log(this.state.journeys[1])
    })
  }
  // }, () => {
  //   for (let i = 0; i < this.state.journeys.length; i++) {
  //     console.log(this.getJourneyAirAverage(i))
  //   }
  // })

  getJourneys = (userId) => {
    axios.get('/api/web/' + userId + '/journeys')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getTotalAirAverage = () => {}

  getTotalNoiseAverage = () => {}

  // Statistics
  getTotalDistanceTravelled = (journey) => {}

  // Trips
  getJourneyMonth = (journey) => {}

  getJourneyDay = (journey) => {}

  getJourneyStartTime = (journey) => {}

  getJourneyEndTime = (journey) => {}

  getJourneyDistance = (journey) => {}

  getJourneyAirAverage = (journey) => {
    let userId = journey.userId
    let journeyId = journey.journeyId
    // Get journey array
    axios.get('api/web' + userId + 'journeys' / journeyId)
      .then((response) => {
        // TODO: Average air here
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getJourneyNoiseAverage = (journey) => {}

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
              <Card className='average' link={``}>
                <IconAirPollution className='icon' />
                <div className='details'>
                  <h1>Average Air Pollution Exposure</h1>
                  <span className='value'>Moderate</span>
                </div>
              </Card>
              <Card className='average' link={``}>
                <IconNoise className='icon' />
                <div className='details'>
                  <h1>Average Noise Pollution Exposure</h1>
                  <span className='value'>25 dBA</span>
                </div>
              </Card>
            </Section>
            <Section title='Your Trips'>
              <Card className='average' link={``}>
                <div className='date'>
                  <h1>March</h1>
                  <span>30</span>
                </div>
                <div className='details'>
                  <h1>6:45 - 7:30</h1>
                  <span className='value'>3 Miles</span>
                </div>
              </Card>
              <Card className='average' link={``}>
                <div className='date'>
                  <h1>January</h1>
                  <span>16</span>
                </div>
                <div className='details'>
                  <h1>10:32 - 11:02</h1>
                  <span className='value'>1 Mile</span>
                </div>
              </Card>
              <Card className='average' link={``}>
                <div className='date'>
                  <h1>March</h1>
                  <span>02</span>
                </div>
                <div className='details'>
                  <h1>9:35 - 11:58</h1>
                  <span className='value'>5 Miles</span>
                </div>
              </Card>
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
