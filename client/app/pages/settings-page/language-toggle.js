import React from 'react'
import PropTypes from 'prop-types'
import { withLocalize } from 'react-localize-redux'
import IconButton from '../../components/common/icon-button'

// Icons
import England from './icons/England.svg'
import Wales from './icons/Wales.svg'

const LanguageToggle = ({ setActiveLanguage }) => (
  <div className='containter'>
    <IconButton icon={England} onClick={() => setActiveLanguage('en')} />
    <IconButton icon={Wales} onClick={() => setActiveLanguage('cy')} />
  </div>
)

LanguageToggle.propTypes = {
  setActiveLanguage: PropTypes.object
}

export default withLocalize(LanguageToggle)
