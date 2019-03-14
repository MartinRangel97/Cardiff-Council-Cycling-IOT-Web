import React from 'react'

import Searchbar from './searchbar'
import OverlayPicker from './overlay-picker'

export default class MapView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOverlay: 'none'
    }
  }

  changeSelectedOverlay = (selection) => {
    this.setState({ selectedOverlay: selection })
  }

  render () {
    return (
      <div className='map-container'>
        <div className='toolbar'>
          <div className='left' />
          <div className='mid'>
            <Searchbar />
          </div>
          <div className='right'>
            <OverlayPicker selected={this.state.selectedOverlay} onChange={this.changeSelectedOverlay} />
          </div>
        </div>
        <div className='map'>
          Map
        </div>
      </div>
    )
  }
}
