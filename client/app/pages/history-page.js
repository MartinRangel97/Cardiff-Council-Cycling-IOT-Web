import React from 'react'

import SidebarPage from '../components/sidebar/sidebar-page'
import Section from '../components/common/section'
import Card from '../components/common/card'
import Calendar from 'rc-calendar'
import 'rc-calendar/assets/index.css'

export default class HistoryPage extends React.Component {
  render () {
    return (
      <SidebarPage title='History'>
        <Section title='Hello World'>
          <Card>
            <Calendar
              showWeekNumber={false}
              // locale={cn ? zhCN : enUS}
              // defaultValue={now}
              // disabledTime={disabledTime}
              showDateInput={false}
              showToday={false}
              showOk={false}
              // timePicker={timePickerElement}
              // onChange={onStandaloneChange}
              // disabledDate={disabledDate}
              // onSelect={onStandaloneSelect}
            />
          </Card>
        </Section>
      </SidebarPage>
    )
  }
}
