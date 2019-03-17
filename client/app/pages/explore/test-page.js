import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page/page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'

export default class TestPage extends React.Component {
  render () {
    return (
      <Page className='test-page' title='Test Page' path={this.props.path} canGoBack fullWidth>
        <Section title='About'>
          <Card>
            This is an example of a full width page.
          </Card>
        </Section>
      </Page>
    )
  }
}

TestPage.propTypes = {
  path: PropTypes.string
}
