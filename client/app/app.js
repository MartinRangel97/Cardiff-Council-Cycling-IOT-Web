// React
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

// Components
import Layout from './components/layout/layout'
import MapView from './components/map/map-view'
import Sidebar from './components/sidebar/sidebar'
import SidebarPageManager from './components/sidebar/sidebar-page-manager'
import ConfirmationModal from './components/modal/confirmation-modal'

// Pages
import ExplorePage from './pages/explore-page'
import ProfilePage from './pages/profile-page'
import HistoryPage from './pages/history-page'
import SearchPage from './pages/search-page'
import AveragesPage from './pages/explore-page/averages-page'
import SettingsPage from './pages/settings-page'
import DetailsPage from './pages/details-page'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSidebar: true,
      showLogoutConfirmation: false,
      mapState: null,
      readings: [[]],
      airQualityIndex: 'N/A',
      circleAverages: {
        dB: 0,
        NO2: 0,
        PM10: 0,
        PM25: 0
      }
    }

    this.setExploreReadings = this.setExploreReadings.bind(this)
  }

  hideSplash () {
    // Hide the splash screen
    // Ref: https://github.com/nguyenbathanh/react-loading-screen
    const loadingScreen = document.getElementById('splash-screen')
    loadingScreen.classList.add('fade-out')
    setTimeout(() => {
      loadingScreen.outerHTML = ''
    }, 200)
  }

  onMapLoad = () => {
    this.hideSplash()
  }

  onMapClick = (event) => {
    this.setState({
      showSidebar: true,
      mapState: {
        clickLocation: event.lngLat
      }
    })
  }

  setMapCurrentRadius = (point) => {
    this.setState({
      mapState: {
        currentRadius: point
      }
    })
  }

  getCircleAverage = (lat, lon, rad) => {
    axios.post('/api/web/circleAverage', {
      'latitude': lat,
      'longitude': lon,
      'radius': rad
    })
      .then((response) => {
        if (response.data.dB !== null) {
          this.setState({
            circleAverages: {
              dB: response.data.dB.toFixed(0),
              NO2: response.data.NO2.toFixed(0),
              PM10: response.data.PM10.toFixed(0),
              PM25: response.data.PM25.toFixed(0)
            }
          })
        } else {
          this.setState({
            circleAverages: {
              dB: 0,
              NO2: 0,
              PM10: 0,
              PM25: 0
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Handle air quality index
  getAirQualityIndex = (no2, pm25, pm10) => {
    let highestIndex = Math.max(this.getNO2Index(no2), this.getPM25Index(pm25), this.getPM10Index(pm10))
    let aqi
    if (highestIndex > 0 && highestIndex <= 3) {
      aqi = 'Low'
    } else if (highestIndex <= 6) {
      aqi = 'Moderate'
    } else if (highestIndex <= 9) {
      aqi = 'High'
    } else if (highestIndex > 9) {
      aqi = 'Very High'
    } else if (highestIndex === 0) {
      aqi = 'N/A'
    } else {
      aqi = 'N/A'
    }
    this.setState({
      airQualityIndex: aqi
    })
    return aqi
  }

  getNO2Index = (no2) => {
    if (no2 > 0 && no2 < 68) {
      return 1
    } else if (no2 <= 134) {
      return 2
    } else if (no2 <= 200) {
      return 3
    } else if (no2 <= 267) {
      return 4
    } else if (no2 <= 334) {
      return 5
    } else if (no2 <= 400) {
      return 6
    } else if (no2 <= 467) {
      return 7
    } else if (no2 <= 534) {
      return 8
    } else if (no2 <= 535) {
      return 9
    } else if (no2 >= 536) {
      return 10
    } else if (no2 === 0) {
      return 0
    } else {
      return 0
    }
  }

  getPM25Index = (pm25) => {
    if (pm25 > 0 && pm25 < 12) {
      return 1
    } else if (pm25 <= 23) {
      return 2
    } else if (pm25 <= 35) {
      return 3
    } else if (pm25 <= 41) {
      return 4
    } else if (pm25 <= 47) {
      return 5
    } else if (pm25 <= 53) {
      return 6
    } else if (pm25 <= 58) {
      return 7
    } else if (pm25 <= 64) {
      return 8
    } else if (pm25 <= 70) {
      return 9
    } else if (pm25 >= 71) {
      return 10
    } else if (pm25 === 0) {
      return 0
    } else {
      return 0
    }
  }

  getPM10Index = (pm10) => {
    if (pm10 > 0 && pm10 < 17) {
      return 1
    } else if (pm10 <= 33) {
      return 2
    } else if (pm10 <= 50) {
      return 3
    } else if (pm10 <= 58) {
      return 4
    } else if (pm10 <= 66) {
      return 5
    } else if (pm10 <= 75) {
      return 6
    } else if (pm10 <= 83) {
      return 7
    } else if (pm10 <= 91) {
      return 8
    } else if (pm10 <= 100) {
      return 9
    } else if (pm10 > 101) {
      return 10
    } else if (pm10 === 0) {
      return 0
    } else {
      return 0
    }
  }

  toggleSidebar = (show) => {
    if (typeof show !== 'boolean') {
      this.setState({ showSidebar: !this.state.showSidebar })
    } else {
      this.setState({ showSidebar: show })
    }
  }

  logout = () => {
    window.location = '/'
  }

  toggleLogoutConfirmation = () => {
    this.setState({ showLogoutConfirmation: !this.state.showLogoutConfirmation })
  }

  // Gets all of the readings in the last 24 hours
  setExploreReadings = () => {
    axios.get('/api/web/allReadings')
      .then((response) => {
        this.setState({
          readings: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  setProfileReadings = (userId) => {
    axios.get('/api/web/' + userId + '/readings')
      .then((response) => {
        this.setState({
          readings: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <Layout sidebarToggle={this.toggleSidebar} logout={this.toggleLogoutConfirmation} >
        <MapView
          onMapLoad={this.onMapLoad}
          onMapClick={this.onMapClick}
          mapState={this.state.mapState}
          sidebarToggle={this.toggleSidebar}
          data={this.state.readings}
        />
        <Sidebar showSidebar={this.state.showSidebar}>
          <SidebarPageManager>
            <Redirect exact from={this.props.match.path} to='/app/explore' />
            <Route path={`${this.props.match.path}/explore`} render={(props) =>
              <ExplorePage {...props}
                mapState={this.state.mapState}
                setMapCurrentRadius={this.setMapCurrentRadius}
                setData={this.setExploreReadings}
                getCircleAverage={this.getCircleAverage}
                getAirQualityIndex={this.getAirQualityIndex}
                airQualityIndex={this.state.airQualityIndex}
                circleAverages={this.state.circleAverages}
              />
            } />
            <Route path={`${this.props.match.path}/profile`} render={(props) =>
              <ProfilePage {...props}
                mapState={this.state.mapState}
                getCircleAverage={this.getCircleAverage}
                setMapCurrentRadius={this.setMapCurrentRadius}
                getAirQualityIndex={this.getAirQualityIndex}
                airQualityIndex={this.state.airQualityIndex}
                circleAverages={this.state.circleAverages}
                setData={this.setProfileReadings}
              />
            } />
            <Route path={`${this.props.match.path}/history`} render={(props) => <HistoryPage {...props} />} />
            <Route path={`${this.props.match.path}/search`} render={(props) => <SearchPage {...props} />} />
          </SidebarPageManager>
        </Sidebar>
        <AveragesPage path={`${this.props.match.path}/explore/averages/:type`} />
        <AveragesPage path={`${this.props.match.path}/profile/averages/:type`} />
        <SettingsPage path={`${this.props.match.path}/settings`} />
        <DetailsPage path={`${this.props.match.path}/history/view/details`} />
        <ConfirmationModal
          show={this.state.showLogoutConfirmation}
          close={this.toggleLogoutConfirmation}
          title='Logout'
          subheading='Are you sure you want to logout?'
          onNo={this.toggleLogoutConfirmation}
          onYes={this.logout}
          dangerYes />
      </Layout>
    )
  }
}

App.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
}
