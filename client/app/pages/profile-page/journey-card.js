import React from 'react'
import PropTypes from 'prop-types'

import Card from '../../components/common/card'

const Journey = props => {
  return (
    <Card className='average journey' link={props.link}>
      <div className='date'>
        <h1>{props.month}</h1>
        <span>{props.day}</span>
      </div>
      <div className='details'>
        <h1>{props.startTime} - {props.endTime}</h1>
        <span className='value'>{props.distanceTravelled} Miles</span>
      </div>
    </Card>
  )
}

Journey.propTypes = {
  month: PropTypes.string,
  day: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  distanceTravelled: PropTypes.number,
  link: PropTypes.string
}

export default Journey
