import React from 'react'
import PropTypes from 'prop-types'

import StateModal from '../components/modal/state-modal'

export default class SettingsModal extends React.Component {
  render () {
    return (
      <StateModal className='settings-modal' title='Settings' show={this.props.show} close={this.props.close}>
        <h2>Hello World</h2>
      </StateModal>
    )
  }
}

SettingsModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func
}
