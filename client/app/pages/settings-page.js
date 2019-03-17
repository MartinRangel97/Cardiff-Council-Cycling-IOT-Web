import React from 'react'
import PropTypes from 'prop-types'

import Page from '../components/page/page'
import Section from '../components/common/section'
import Card from '../components/common/card'
import Button from '../components/common/button'
import IconButton from '../components/common/icon-button'
import Toggle from '../components/common/toggle'

import IconBike from './icons/bike.svg'

export default class SettingsModal extends React.Component {
  render () {
    return (
      <Page className='settings-modal' title='Settings' path={this.props.path}>
        <Section title='Text Buttons'>
          <Card>
            <Button text='Standard Button' />
            <Button text='Danger Button' danger />
          </Card>
        </Section>
        <Section title='Icon Button'>
          <Card>
            <IconButton icon={IconBike} />
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

SettingsModal.propTypes = {
  path: PropTypes.string
}
