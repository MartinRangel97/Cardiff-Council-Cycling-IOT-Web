import React from 'react'
import PropTypes from 'prop-types'

import StateModal from '../components/modal/state-modal'

export default class SettingsModal extends React.Component {
  render () {
    return (
      <StateModal className='read-article' show={this.props.show} close={this.props.close}>
        Setup Model
      </StateModal>
    )
  }
}

SettingsModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func
}
