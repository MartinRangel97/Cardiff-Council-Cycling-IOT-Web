import React from 'react'

import Searchbar from './searchbar'

export default class Map extends React.Component {
  render () {
    return (
      <div className='map-container'>
        <div className='toolbar'>
          <div className='left' />
          <div className='mid'>
            <Searchbar />
          </div>
          <div className='right' />
        </div>
        <div className='map'>
          Map
        </div>
      </div>
    )
  }
}
