import React from 'react'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import settingsTranslations from '../../translations/settings-page.json'

import Page from '../components/page/page'
import Section from '../components/common/section'
import Card from '../components/common/card'
import Button from '../components/common/button'
import IconButton from '../components/common/icon-button'
import Toggle from '../components/common/toggle'
import Divider from '../components/common/divider'
import LanguageSelector from '../Language-Selector'

// Icons

class SettingsModal extends React.Component {
  constructor (props) {
    super(props)

    this.props.addTranslation(settingsTranslations)
  }

  downloadExportedData = () => {
    window.open('/api/web/export', '_blank')
  }

  render () {
    return (
      <Page className='settings-modal' title='Settings' path={this.props.path} canGoBack>
        <Section title='General'>
          <Card className={'p-0'}>
            <div className='setting'>
              <div className='details'>
                <h1>
                  <Translate id='settings.languageTitle' />
                </h1>
                <h2>
                  <Translate id='settings.languageDetails' />
                </h2>
              </div>
              <div className='action'>
                <LanguageSelector />
              </div>
            </div>
            <Divider />
            <div className='setting'>
              <div className='details'>
                <h1>
                  <Translate id='settings.csvTitle' />
                </h1>
                <h2>
                  <Translate id='settings.csvDetails' />
                </h2>
              </div>
              <div className='actions'>
                <Button text='Export' onClick={this.downloadExportedData} />
              </div>
            </div>
          </Card>
        </Section>
        <Section title='Privacy'>
          <Card className={'p-0'}>
            <div className='setting'>
              <div className='details'>
                <h1>
                  <Translate id='settings.readingsTitle' />
                </h1>
                <h2>
                  <Translate id='settings.readingsDetails1' />
                </h2>
                <h2>
                  <Translate id='settings.readingsDetails2' />
                </h2>
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
                <h1>
                  <Translate id='settings.emailTitle' />
                </h1>
                <h2>
                  <Translate id='settings.emailDetails' />
                </h2>
              </div>
              <div className='action'>
                <Button text='Change Email' />
              </div>
            </div>
            <Divider />
            <div className='setting'>
              <div className='details'>
                <h1>
                  <Translate id='settings.passwordTitle' />
                </h1>
                <h2>
                  <Translate id='settings.passwordDetails' />
                </h2>
              </div>
              <div className='actions'>
                <Button text='Change Password' />
              </div>
            </div>
            <Divider />
            <div className='setting'>
              <div className='details'>
                <h1>
                  <Translate id='settings.deleteTitle' />
                </h1>
                <h2>
                  <Translate id='settings.deleteDetails' />
                </h2>
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

export default withLocalize(SettingsModal)
