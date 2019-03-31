import React from 'react'
import PropTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import settingsTranslations from '../../translations/settings-page.json'

import Page from '../components/page/page'
import Section from '../components/common/section'
import Card from '../components/common/card'
import Button from '../components/common/button'
import Toggle from '../components/common/toggle'
import Divider from '../components/common/divider'
import LanguageSelector from './settings-page/language-toggle'

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
      <Page className='settings-modal' title={<Translate id='settings.settings' />} path={this.props.path} canGoBack>
        <Section title={<Translate id='settings.general' />} >
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
                <Button text={<Translate id='settings.exportButton' />} onClick={this.downloadExportedData} />
              </div>
            </div>
          </Card>
        </Section>
        <Section title={<Translate id='settings.privacy' />} >
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
        <Section title={<Translate id='settings.account' />}>
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
                <Button text={<Translate id='settings.emailButton' />} />
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
                <Button text={<Translate id='settings.buttonPassword' />} />
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
                <Button text={<Translate id='settings.deleteButton' />} danger />
              </div>
            </div>
          </Card>
        </Section>
      </Page>
    )
  }
}

SettingsModal.propTypes = {
  path: PropTypes.string,
  addTranslation: PropTypes.object
}

export default withLocalize(SettingsModal)
