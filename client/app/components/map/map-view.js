import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

import Searchbar from './searchbar'
import OverlayPicker from './overlay-picker'

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXRoYW5wZXRlcmNvbGUiLCJhIjoiY2p0YmkzanVwMGtyNTN5bzNydTNpYjB2OSJ9.ac1RTVcnsO8Ek-rgVeQe3g'

export default class MapView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOverlay: 'none'
    }
  }

  componentDidMount () {
    // Public Style URL:
    // https://api.mapbox.com/styles/v1/jonathanpetercole/cjtb9gdix19sd1fmy23x766v3.html?fresh=true&title=true&access_token=pk.eyJ1Ijoiam9uYXRoYW5wZXRlcmNvbGUiLCJhIjoiY2p0YWhqaTRrMGFydjQzcWQ1NWR5aTk3dCJ9.V7HyWXQG5lpWtgk-17y6yw#13.5/51.480233/-3.152327/0
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jonathanpetercole/cjtb9gdix19sd1fmy23x766v3',
      center: [-3.175559, 51.480802],
      zoom: 13.75
    })
    // Prepare event listeners
    this.map.on('load', () => {
      this.props.onMapLoad()
    })
    this.map.on('click', (event) => {
      this.props.onMapClick(event)
    })
  }

  changeSelectedOverlay = (selection) => {
    this.setState({ selectedOverlay: selection })
  }

  componentWillUnmount () {
    this.map.remove()
  }

  render () {
    return (
      <div className='map-container'>
        <div className='toolbar'>
          <div className='left' />
          <div className='mid'>
            <Searchbar onSubmit={() => { this.props.sidebarToggle(true) }} />
          </div>
          <div className='right'>
            <OverlayPicker selected={this.state.selectedOverlay} onChange={this.changeSelectedOverlay} />
          </div>
        </div>
        <div className='map' ref={element => (this.mapContainer = element)} />
      </div>
    )
  }
}

MapView.propTypes = {
  sidebarToggle: PropTypes.func,
  onMapLoad: PropTypes.func,
  onMapClick: PropTypes.func
}
