import React from 'react'
import PropTypes from 'prop-types'

import LinkModal from '../components/modal/link-modal'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class TestModal extends React.Component {
  render () {
    return (
      <LinkModal className='test-modal' title='Test Modal' path={this.props.path}>
        <Section title='Hello World'>
          <Card>
            Content will go here...
          </Card>
        </Section>
      </LinkModal>
    )
  }
}

TestModal.propTypes = {
  path: PropTypes.string
}
