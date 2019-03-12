import React from 'react'
import PropTypes from 'prop-types'

import LinkModal from '../components/modal/link-modal'

export default class TestModal extends React.Component {
  render () {
    return (
      <LinkModal className='test-modal' title='Test Modal' path={this.props.path}>
        <h2>Hello World</h2>
      </LinkModal>
    )
  }
}

TestModal.propTypes = {
  path: PropTypes.string
}
