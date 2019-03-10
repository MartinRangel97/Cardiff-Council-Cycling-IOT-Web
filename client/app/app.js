// React
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Components
import Layout from './components/layout/layout'
import Map from './components/map/map'
import Sidebar from './components/sidebar/sidebar'

// Pages
import ExplorePage from './pages/explore-page'
import ProfilePage from './pages/profile-page'
import HistoryPage from './pages/history-page'

export default class App extends React.Component {
  render () {
    return (
      <Layout>
        <Map />
        <Sidebar>
          <Switch>
            <Redirect exact from='/app' to='/app/explore' />
            <Route path='/app/explore'>
              <ExplorePage />
            </Route>
            <Route path='/app/profile'>
              <ProfilePage />
            </Route>
            <Route path='/app/History'>
              <HistoryPage />
            </Route>
          </Switch>
        </Sidebar>
      </Layout>
    )
  }
}
