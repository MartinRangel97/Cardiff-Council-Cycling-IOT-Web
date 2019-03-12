import React from 'react'
import PropTypes from 'prop-types'

import StateModal from '../components/modal/state-modal'

export default class SettingsModal extends React.Component {
  render () {
    return (
      <StateModal className='settings-modal' show={this.props.show} close={this.props.close}>
        <h1>Settings Modal</h1>
      </StateModal>
    )
  }
}

SettingsModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func
}
