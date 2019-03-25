import React from 'react'
import PropTypes from 'prop-types'

import Page from '../components/page/page'
import Section from '../components/common/section'
import Card from '../components/common/card'
import Button from '../components/common/button'
import IconButton from '../components/common/icon-button'
import Toggle from '../components/common/toggle'
import Divider from '../components/common/divider'

// Icons
import EnglishFlag from './settings-page/icons/England.svg'
import WelshFlag from './settings-page/icons/Wales.svg'

export default class SettingsModal extends React.Component {
  render () {
    return (
      <Page className='settings-modal' title='Settings' path={this.props.path} canGoBack>
        <Section title='General'>
          <Card className={'p-0'}>
            <div className='setting'>
              <div className='details'>
                <h1>Language</h1>
                <h2>Select your Language / Dewiswch eich iaith</h2>
              </div>
              <div className='action'>
                <IconButton icon={WelshFlag} />
              </div>
              <div className='action'>
                <IconButton icon={EnglishFlag} />
              </div>
            </div>
          </Card>
        </Section>
        <Section title='Privacy'>
          <Card className={'p-0'}>
            <div className='setting'>
              <div className='details'>
                <h1>Share Readings Publicly</h1>
                <h2>Your readings are currently shown on the public map.</h2>
                <h2>These readings are anonymous and your trips are not public.</h2>
              </div>
              <div className='action'>
                <Toggle />
              </div>
            </div>
          </Card>
        </Section>
        <Section title='Account'>
          <Card className={'p-0'}>
            <div className='setting'>
              <div className='details'>
                <h1>Email</h1>
                <h2>Change your account email.</h2>
              </div>
              <div className='action'>
                <Button text='Change Email' />
              </div>
            </div>
            <Divider />
            <div className='setting'>
              <div className='details'>
                <h1>Password</h1>
                <h2>Change your account Password.</h2>
              </div>
              <div className='actions'>
                <Button text='Change Password' />
              </div>
            </div>
            <Divider />
            <div className='setting'>
              <div className='details'>
                <h1>Delete Account</h1>
                <h2>Careful, this cannot be undone.</h2>
              </div>
              <div className='actions'>
                <Button text='Delete Account' danger />
              </div>
            </div>
          </Card>
        </Section>
      </Page>
    )
  }
}

SettingsModal.propTypes = {
  path: PropTypes.string
}
