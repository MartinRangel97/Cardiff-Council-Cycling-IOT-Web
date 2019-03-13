import React from 'react'
import PropTypes from 'prop-types'

import StateModal from '../components/modal/state-modal'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class SettingsModal extends React.Component {
  render () {
    return (
      <StateModal className='settings-modal' title='Settings' show={this.props.show} close={this.props.close}>
        <Section title='General'>
          <Card>
            Settings will go here...
          </Card>
        </Section>
      </StateModal>
    )
  }
}

SettingsModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func
}
