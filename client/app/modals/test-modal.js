import React from 'react'
import PropTypes from 'prop-types'

import LinkModal from '../components/modal/link-modal'
import Section from '../components/common/section'
import Card from '../components/common/card'
import Button from '../components/common/button'
import IconButton from '../components/common/icon-button'
import Toggle from '../components/common/toggle'

import LogoGradient from '../icons/logo-gradient.svg'

export default class TestModal extends React.Component {
  render () {
    return (
      <LinkModal className='test-modal' title='Test Modal' path={this.props.path}>
        <Section title='Text Buttons'>
          <Card>
            <Button text='Standard Button' />
            <Button text='Danger Button' danger />
          </Card>
        </Section>
        <Section title='Icon Button'>
          <Card>
            <IconButton icon={LogoGradient} />
          </Card>
        </Section>
        <Section title='Toggles'>
          <Card>
            <Toggle />
            <br />
            <Toggle defaultChecked />
          </Card>
        </Section>
      </LinkModal>
    )
  }
}

TestModal.propTypes = {
  path: PropTypes.string
}
