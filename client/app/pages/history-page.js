import React from 'react'
import PropTypes from 'prop-types'

import Card from '../components/common/card'
import Calendar from 'rc-calendar'
import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import moment from 'moment'

import IconAirPollution from './explore-page/icons/air-pollution.svg'
import 'rc-calendar/assets/index.css'

// Bug: Today is not highlighted when clicked, change css
// Todo: return search results of noise/air pollution for selected day
// Todo: Provide link to detailed analytics of selected day
// Proptypes? http://react-component.github.io/calendar/examples/antd-calendar.html

export default class HistoryPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: moment(),
      link: null
    }
  }

  onChange = (value) => {
    this.setState({ value, link: value.format('YYYY/MM/DD') }, function() {
      this.props.history.push({
        pathname: '/app/history/',
        search: '?date=' + this.state.value.format('YYYY/MM/DD')
      })
      console.log(this.state.value)
    })
  }

  openAddBoardModal(){
    this.setState({ boardAddModalShow: true }, function () {
        console.log(this.state.boardAddModalShow);
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
              showToday
              showOk
              onOk={this.onChange}
            />
          </Card>
          <Card className='average' link={`/app/history/?date=${this.state.link}/details`}>
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

HistoryPage.propTypes = {
  history: PropTypes.object
}
