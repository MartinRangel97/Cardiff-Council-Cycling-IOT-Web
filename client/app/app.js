// React
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

// Components
import Layout from './components/layout/layout'
import Map from './components/map/map'
import Sidebar from './components/sidebar/sidebar'
import SidebarPageManager from './components/sidebar/sidebar-page-manager'

// Pages
import ExplorePage from './pages/explore-page'
import ProfilePage from './pages/profile-page'
import HistoryPage from './pages/history-page'
import SettingsModal from './modals/settings-modal'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSidebar: true,
      showSettings: false
    }
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
        <Map />
        <Sidebar showSidebar={this.state.showSidebar}>
          <SidebarPageManager pathLevel={2}>
            <Redirect exact from={this.props.match.path} to='/app/explore' />
            <Route path={`${this.props.match.path}/explore`} render={(props) => <ExplorePage {...props} />} />
            <Route path={`${this.props.match.path}/profile`} render={(props) => <ProfilePage {...props} />} />
            <Route path={`${this.props.match.path}/history`} render={(props) => <HistoryPage {...props} />} />
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
