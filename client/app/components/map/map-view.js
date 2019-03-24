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
      center: [-79.999732, 40.4374],
      zoom: 11
      // Cardiff
      // center: [-3.175559, 51.480802],
      // zoom: 13.75
    })

    // Prepare event listeners
    this.map.on('load', () => {
      this.props.onMapLoad()
      this.map.addSource('trees', {
        type: 'geojson',
        data: '/static/trees.geojson'
      })
      // add heatmap layer here
      this.map.addLayer({
        id: 'trees-heat',
        type: 'heatmap',
        source: 'trees',
        maxzoom: 15,
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [1, 0],
              [62, 1]
            ]
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [
              [11, 1],
              [15, 3]
            ]
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(236,222,239,0)',
            0.2, 'rgb(208,209,230)',
            0.4, 'rgb(166,189,219)',
            0.6, 'rgb(103,169,207)',
            0.8, 'rgb(28,144,153)'
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [11, 15],
              [15, 20]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [14, 1],
              [15, 0]
            ]
          }
        }
      }, 'road-label')
      // add circle layer here
      this.map.addLayer({
        id: 'trees-point',
        type: 'circle',
        source: 'trees',
        minzoom: 14,
        paint: {
          // increase the radius of the circle as the zoom level and dbh value increases
          'circle-radius': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [{ zoom: 15, value: 1 }, 5],
              [{ zoom: 15, value: 62 }, 10],
              [{ zoom: 22, value: 1 }, 20],
              [{ zoom: 22, value: 62 }, 50]
            ]
          },
          'circle-color': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [0, 'rgba(236,222,239,0)'],
              [10, 'rgb(236,222,239)'],
              [20, 'rgb(208,209,230)'],
              [30, 'rgb(166,189,219)'],
              [40, 'rgb(103,169,207)'],
              [50, 'rgb(28,144,153)'],
              [60, 'rgb(1,108,89)']
            ]
          },
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': {
            stops: [
              [14, 0],
              [15, 1]
            ]
          }
        }
      }, 'road-label')
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
