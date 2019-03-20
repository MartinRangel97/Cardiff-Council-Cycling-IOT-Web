import React from 'react'

import Card from '../components/common/card'
import Calendar from 'rc-calendar'
import Button from '../components/common/button'
import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import moment from 'moment';

import IconAirPollution from './explore-page/icons/air-pollution.svg'
import 'rc-calendar/assets/index.css'

// Todo: return search results of noise/air pollution for selected day
// Todo: Provide link to detailed analytics of selected day
// Proptypes? http://react-component.github.io/calendar/examples/antd-calendar.html

export default class HistoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: moment(),
      link: null
    }
  }

  onChange = (value) => {
    console.log(value.format('YYYY/MM/DD'))
    this.setState({
      value,
      link: value.format('YYYY/MM/DD')
    });
  }

  render () {
    return (
      <SidebarPage title='History'>
        <Section title='Select a day:'>
          <Card>
            <Calendar
              showWeekNumber={false}
              showDateInput={false}
              showToday={true}
              showOk={true}
              onOk={this.onChange}
            />
          </Card>
          <Card className='average' link={`/app/history/${this.state.link}`}>
            <IconAirPollution className='icon' />
            <div className='details'>
              <h1>Air Pollution</h1>
              <span className='value'>Moderate</span>
            </div>
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}
