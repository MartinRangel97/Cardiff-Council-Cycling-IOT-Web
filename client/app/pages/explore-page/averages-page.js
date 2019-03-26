import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page/page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'

export default class AveragesPage extends React.Component {
  render () {
    return (
      <Page className='averages-page' title='Averages' path={this.props.path} canGoBack fullWidth>
        <Section title='About'>
          <Card>
            This is an example of a full width page.
          </Card>
        </Section>
      </Page>
    )
  }
}

AveragesPage.propTypes = {
  path: PropTypes.string
}
