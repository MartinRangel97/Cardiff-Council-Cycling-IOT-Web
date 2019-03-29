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
      selectedOverlay: 'air'
    }
    this.createRadius = this.createRadius.bind(this)
  }

  componentDidUpdate (prevProps) {
    // Check if the mapstate changed
    if (prevProps.mapState !== this.props.mapState) {
      // Check if current radius is not null
      if (this.props.mapState.currentRadius) {
        // Get the coordinates from mapstate
        let coordinates = [parseFloat(this.props.mapState.currentRadius.lng), parseFloat(this.props.mapState.currentRadius.lat)]
        let radius = 1

        // If a circle exists, remove it
        if (this.map.getSource('clickRadius')) {
          this.map.removeLayer('clickRadius')
          this.map.removeSource('clickRadius')
        }

        this.map.addSource('clickRadius', this.createRadius(coordinates, radius))
        this.map.addLayer({
          'id': 'clickRadius',
          'type': 'fill',
          'source': 'clickRadius',
          'layout': {},
          'paint': {
            'fill-color': '#4c9cff',
            'fill-opacity': 0.5
          }
        })
      } else {
        // If a circle exists, remove it
        if (this.map.getSource('clickRadius')) {
          this.map.removeLayer('clickRadius')
          this.map.removeSource('clickRadius')
        }
      }
    }
  }

  /*
    TODO: Function purpose
    center: Expects an array [[long], [lat]]
    radius: Radius in miles
    points: Number of points plotted, higher values create a smoother radius
  */
  createRadius = (center, radius, points) => {
    if (!points) {
      points = 48
    }

    // Ref: https://gist.github.com/chriswhong/694779bc1f1e5d926e47bab7205fa559
    const coordinates = {
      longitude: center[0],
      latitude: center[1]
    }

    let output = []
    const distanceX = radius / (69.2 * Math.cos(coordinates.latitude * Math.PI / 180))
    const distanceY = radius / 68.707

    // Plot points in a circle
    let theta, x, y
    for (var i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI)
      x = distanceX * Math.cos(theta)
      y = distanceY * Math.sin(theta)

      output.push([coordinates.longitude + x, coordinates.latitude + y])
    }
    // Push all points into first array
    output.push(output[0])

    // Return geojson object with calculated coordinates
    return {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [output]
          }
        }]
      }
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
      this.map.addSource('air', {
        type: 'geojson',
        data: '/static/trees.geojson'
      })
      this.map.addSource('noise', {
        type: 'geojson',
        data: '/static/noise.geojson'
      })
      // add air layer here
      this.map.addLayer({
        id: 'air',
        type: 'circle',
        source: 'air',
        paint: {
          // increase the radius of the circle as the zoom level and dbh value increases
          'circle-radius': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [{ zoom: 11, value: 1 }, 1.5],
              [{ zoom: 15, value: 1 }, 3],
              [{ zoom: 22, value: 1 }, 10]
            ]
          },
          'circle-color': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              // TODO: change stops to reflect AQI
              [0, 'rgb(0, 228, 0)'], // green - good
              [20, 'rgb(255, 255, 0)'], // yellow - moderate
              [30, 'rgb(255, 126, 0)'], // orange - unhealthy for sensitive groups
              [40, 'rgb(255, 0, 0)'], // red - unhealthy
              [50, 'rgb(143, 63, 151)'], // purple - very unhealthy
              [60, 'rgb(143, 63, 151)'] // maroon - hazardous
            ]
          }
        }
      }, 'road-label')
      // add noise layer here
      this.map.addLayer({
        id: 'noise',
        type: 'circle',
        source: 'noise',
        paint: {
          // increase the radius of the circle as the zoom level and dbh value increases
          'circle-radius': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [{ zoom: 11, value: 1 }, 1.5],
              [{ zoom: 15, value: 1 }, 3],
              [{ zoom: 22, value: 1 }, 10]
            ]
          },
          'circle-color': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              // TODO: change stops to reflect AQI
              [0, 'rgb(0, 228, 0)'], // green - good
              [20, 'rgb(255, 255, 0)'], // yellow - moderate
              [30, 'rgb(255, 126, 0)'], // orange - unhealthy for sensitive groups
              [40, 'rgb(255, 0, 0)'], // red - unhealthy
              [50, 'rgb(143, 63, 151)'], // purple - very unhealthy
              [60, 'rgb(143, 63, 151)'] // maroon - hazardous
            ]
          }
        }
      }, 'road-label')
      // TODO: Is it possible to set visibility when adding layer?
      this.map.setLayoutProperty('noise', 'visibility', 'none')
    })

    // On click circle data point
    this.map.on('click', 'air', (event) => {
      this.props.onMapClick(event)
    })

    // Add zoom and rotation controls to the map
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
  }

  // Filter data source
  changeSelectedOverlay = (selection) => {
    this.setState({ selectedOverlay: selection })

    switch (selection) {
      case 'none':
        this.map.setLayoutProperty('noise', 'visibility', 'none')
        this.map.setLayoutProperty('air', 'visibility', 'none')
        break
      case 'noise':
        this.map.setLayoutProperty('air', 'visibility', 'none')
        this.map.setLayoutProperty('noise', 'visibility', 'visible')
        break
      case 'air':
        this.map.setLayoutProperty('noise', 'visibility', 'none')
        this.map.setLayoutProperty('air', 'visibility', 'visible')
        break
    }
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
  onMapClick: PropTypes.func,
  mapState: PropTypes.object
}
