import React from 'react'
import PropTypes from 'prop-types'

import IconOverlays from '../../icons/overlays.svg'

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
        <img className='icon' src={IconOverlays} />
        <a className={this.getClassName('pollution')} onClick={() => { this.props.onChange('pollution') }}>
          Pollution
        </a>
        <a className={this.getClassName('noise')} onClick={() => { this.props.onChange('noise') }}>
          Noise
        </a>
        <a className={this.getClassName('none')} onClick={() => { this.props.onChange('none') }}>
          None
        </a>
      </div>
    )
  }
}

OverlayPicker.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func
}