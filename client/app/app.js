// React
import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// Components
import Layout from './components/layout/layout'
import Map from './components/map/map'
import Sidebar from './components/sidebar/sidebar'

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
    // Ignore link modal changes
    var key = this.props.location.pathname.split('/')[2]

    return (
      <Layout sidebarToggle={this.toggleSidebar} settingsToggle={this.toggleSettings} >
        <Map />
        <Sidebar showSidebar={this.state.showSidebar}>
          <TransitionGroup>
            <CSSTransition
              key={key}
              classNames='sidebar-fade-animation'
              timeout={150}>
              <Switch location={this.props.location}>
                <Redirect exact from={this.props.match.path} to='/app/explore' />
                <Route path={`${this.props.match.path}/explore`} render={(props) => <ExplorePage {...props} />} />
                <Route path={`${this.props.match.path}/profile`} render={(props) => <ProfilePage {...props} />} />
                <Route path={`${this.props.match.path}/history`} render={(props) => <HistoryPage {...props} />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
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
