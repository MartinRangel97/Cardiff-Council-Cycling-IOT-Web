import React from 'react'
import PropTypes from 'prop-types'

import LinkModal from '../components/modal/link-modal'

export default class TestModal extends React.Component {
  render () {
    return (
      <LinkModal className='test-modal' route={this.props.route}>
        Test Model
      </LinkModal>
    )
  }
}

TestModal.propTypes = {
  route: PropTypes.string
}
