import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import LinkModal from '../components/modal/link-modal'

export default class TestModal extends React.Component {
  render () {
    return (
      <Route render={(props) => (
        <LinkModal {...props} className='test-modal' path={this.props.path}>
          <h1>Test Modal</h1>
        </LinkModal>
      )} />
    )
  }
}

TestModal.propTypes = {
  path: PropTypes.string
}
