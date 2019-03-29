import React from 'react'
import PropTypes from 'prop-types'

import Page from '../components/page/page'
import Section from '../components/common/section'
import Card from '../components/common/card'
import Button from '../components/common/button'
import Toggle from '../components/common/toggle'

export default class DetailsModal extends React.Component {
  render () {
    return (
      <Page className='details-modal' title='Details' path={this.props.path} canGoBack>
        <Section title='Text Buttons'>
          <Card>
            <Button text='Standard Button' />
            <Button text='Danger Button' danger />
          </Card>
        </Section>
        <Section title='Toggles'>
          <Card>
            <Toggle />
            <br />
            <Toggle defaultChecked />
          </Card>
        </Section>
      </Page>
    )
  }
}

DetailsModal.propTypes = {
  path: PropTypes.string
}
