import React from 'react'
import PropTypes from 'prop-types'

import Section from '../../components/common/section'
import Card from '../../components/common/card'

import IconAirPollution from '../explore-page/icons/air-pollution.svg'

export default class ViewDatePage extends React.Component {
  getDate = () => {
    return new URLSearchParams(this.props.location.search.slice(1))
      .get('date')
  }

  render () {
    return (
      <Section title='Selected Day'>
        <Card className='average' link={{
          pathname: `${this.props.match.path}/details`,
          search: `?date=${this.getDate()}`
        }}>
          <IconAirPollution className='icon' />
          <div className='details'>
            <h1>Air Pollution</h1>
            <span className='value'>Moderate</span>
          </div>
        </Card>
      </Section>
    )
  }
}

ViewDatePage.propTypes = {
  path: PropTypes.string,
  match: PropTypes.object,
  location: PropTypes.object
}
