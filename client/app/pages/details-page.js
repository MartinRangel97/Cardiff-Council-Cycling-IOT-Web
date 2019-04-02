import React from 'react'
import PropTypes from 'prop-types'

import MaterialTable from 'material-table'
import Page from '../components/page/page'
import Section from '../components/common/section'
import Card from '../components/common/card'

export default class DetailsModal extends React.Component {
  render () {
    return (
      <Page className='details-modal' title='Details' path={this.props.path} canGoBack>
        <Section>
          <Card className={'p-0'}>
            <MaterialTable
              columns={[
                { title: 'ID', field: 'id' },
                { title: 'Date/Time', field: 'date' },
                { title: 'Location', field: 'location' },
                { title: 'Noise dBA', field: 'noise' },
                { title: 'Air PM2.5', field: 'pmtwofive' },
                { title: 'Air PM10', field: 'pmten' },
                { title: 'Air NO2', field: 'notwo' }
              ]}
              data={[
                { id: '1', location: '-3.179 / 51.48', date: '10/1/2018', noise: 40, pmtwofive: 2, pmten: 3, notwo: 4 },
                { id: '2', location: '-3.179 / 51.48', date: '10/10/2018', noise: 25, pmtwofive: 2, pmten: 3, notwo: 4 },
                { id: '3', location: '-3.179 / 51.48', date: '10/6/2018', noise: 14, pmtwofive: 2, pmten: 3, notwo: 4 },
                { id: '4', location: '-3.179 / 51.48', date: '10/3/2019', noise: 69, pmtwofive: 2, pmten: 3, notwo: 4 },
                { id: '5', location: '-3.179 / 51.48', date: '23/1/2019', noise: 20, pmtwofive: 2, pmten: 3, notwo: 4 },
              ]}
              title='Sensor Readings'
              options={{
                columnsButton: true,
                exportButton: true
              }}
            />
          </Card>
        </Section>
      </Page>
    )
  }
}

DetailsModal.propTypes = {
  path: PropTypes.string
}
