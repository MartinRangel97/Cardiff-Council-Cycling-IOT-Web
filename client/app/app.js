// React
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

// Components
import Layout from './components/layout/layout'
import MapView from './components/map/map-view'
import Sidebar from './components/sidebar/sidebar'
import SidebarPageManager from './components/sidebar/sidebar-page-manager'

// Pages
import ExplorePage from './pages/explore-page'
import ProfilePage from './pages/profile-page'
import HistoryPage from './pages/history-page'
import SearchPage from './pages/search-page'
import SettingsModal from './modals/settings-modal'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSidebar: true,
      showSettings: false
    }
  }

  componentDidMount () {
    // This is an artificial delay that can be replaced with loading data
    setTimeout(() => {
      // Ref: https://github.com/nguyenbathanh/react-loading-screen
      const loadingScreen = document.getElementById('splash-screen')
      loadingScreen.classList.add('fade-out')
      setTimeout(() => {
        // remove from DOM
        loadingScreen.outerHTML = ''
      }, 200)
    }, 500)
  }

  toggleSidebar = (show) => {
    if (typeof show !== 'boolean') {
      this.setState({ showSidebar: !this.state.showSidebar })
    } else {
      this.setState({ showSidebar: show })
    }
  }

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings })
  }

  render () {
    return (
      <Layout sidebarToggle={this.toggleSidebar} settingsToggle={this.toggleSettings} >
        <MapView />
        <Sidebar showSidebar={this.state.showSidebar}>
          <SidebarPageManager>
            <Redirect exact from={this.props.match.path} to='/app/explore' />
            <Route path={`${this.props.match.path}/explore`} render={(props) => <ExplorePage {...props} />} />
            <Route path={`${this.props.match.path}/profile`} render={(props) => <ProfilePage {...props} />} />
            <Route path={`${this.props.match.path}/history`} render={(props) => <HistoryPage {...props} />} />
            <Route path={`${this.props.match.path}/search`} render={(props) => <SearchPage {...props} />} />
          </SidebarPageManager>
        </Sidebar>
        <SettingsModal show={this.state.showSettings} close={this.toggleSettings} />
      </Layout>
    )
  }
}

App.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
}
