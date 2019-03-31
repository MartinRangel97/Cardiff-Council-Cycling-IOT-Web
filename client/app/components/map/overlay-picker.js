import React from 'react'
import PropTypes from 'prop-types'

import IconOverlays from './icons/overlays.svg'

export default class OverlayPicker extends React.Component {
  getClassName = (option) => {
    if (this.props.selected === option) {
      return 'button active'
    } else {
      return 'button'
    }
  }

  render () {
    return (
      <div className='overlay-picker'>
        <div className='icon'>
          <IconOverlays />
        </div>
        <div className='options'>
          <a className={this.getClassName('none')} onClick={() => { this.props.onChange('none') }}>
            None
          </a>
          <a className={this.getClassName('noise')} onClick={() => { this.props.onChange('noise') }}>
            Noise
          </a>
          <a className={this.getClassName('air')} onClick={() => { this.props.onChange('air') }}>
            Air
          </a>
        </div>
      </div>
    )
  }
}

OverlayPicker.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func
}
