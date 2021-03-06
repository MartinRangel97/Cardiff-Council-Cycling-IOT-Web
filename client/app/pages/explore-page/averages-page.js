import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page/page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'

export default class AveragesPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      options: {
        dataLabels: {
          enabled: false
        },

        stroke: {
          width: [3, 3, 3, 3]
        },
        title: {
          text: 'Noise and Air Pollution Readings',
          align: 'Right'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          title: 'Hours'
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                color: '#008FFB'
              }
            },

            title: {
              text: 'µg/m³',
              style: {
                color: '#008FFB'
              }
            },
            tooltip: {
              enabled: true,
              formatter: undefined
            }
          },

          {
            seriesName: 'NO2',
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false,
              color: '#008FFB'
            },
            labels: {
              show: false,
              style: {
                color: '#00E396'
              }
            }
          },
          {
            seriesName: 'PM2.5',
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false,
              color: '#008FFB'
            },
            labels: {
              show: false,
              style: {
                color: '#00E396'
              }
            }
          },
          {
            seriesName: 'PM10',
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false,
              color: '#008FFB'
            },
            labels: {
              show: false,
              style: {
                color: '#00E396'
              }
            }
          },

          {
            seriesName: 'dB',
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                color: '#FEB019'
              }
            },
            title: {
              text: 'Decibel Units',
              style: {
                color: '#FEB019'
              }
            }
          }
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          }
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
      series: [{
        name: 'NO2',
        title: 'NO2',
        type: 'line',
        data: []
      }, {
        name: 'PM2.5',
        title: 'PM2.5',
        data: []
      }, {
        name: 'PM10',
        title: 'PM10',
        data: []
      },
      {
        name: 'dB',
        title: 'dB',
        type: 'line',
        data: []
      }]
    }
  }

  dataresults () {
    axios.get('/api/web/reading/PM25/')
      .then((response) => {
        this.setState({
          options: {
            xaxis: {
              categories: response.data.date
            }
          },
          series: [{
            name: 'NO2',
            title: 'NO2',
            type: 'line',
            data: response.data.no2
            // data: [1,2,3,4,5,6,7,8,9]
          }, {
            name: 'PM2.5',
            title: 'PM2.5',
            data: response.data.pm25
            // data: [1,2,3,4,5,6,7,8,9]
          }, {
            name: 'PM10',
            title: 'PM10',
            data: response.data.pm10
            // data: [1,2,3,4,5,6,7,8,9]
          },
          {
            name: 'dB',
            type: 'line',
            data: response.data.dB
            // data: [1,2,3,4,5,6,7,8,9]
          }]
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentWillMount () {
    this.dataresults()
  }

  render () {
    return (
      <Page className='averages-page' title='Readings' path={this.props.path} canGoBack fullWidth>
        <Section title='Charts'>
          <Card>
            <div id='chart'>
              <ReactApexChart options={this.state.options} series={this.state.series} type='line' height='500' />
            </div>
          </Card>
        </Section>

      </Page>
    )
  }
}

AveragesPage.propTypes = {
  path: PropTypes.string
}
