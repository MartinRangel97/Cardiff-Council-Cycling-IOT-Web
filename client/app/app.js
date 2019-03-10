// React
import React from 'react'

// Components
import Layout from './components/layout/layout'
import Map from './components/map/map'
import Sidebar from './components/sidebar/sidebar'

export default class App extends React.Component {
  render () {
    return (
      <Layout>
        <Map />
        <Sidebar>
          Sidebar Content
        </Sidebar>
      </Layout>
    )
  }
}
