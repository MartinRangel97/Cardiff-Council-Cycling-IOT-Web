import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page/page'
import Section from '../../components/common/section'
import Card from '../../components/common/card'
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios'

export default class AveragesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          enabled: false
        },

        stroke: {
          width: [3, 3, 3, 3]
        },
        title: {
          text: 'Noise and Air Pollution Readings over the last 12hrs',
          align: 'Right',
        },
        xaxis: {
          offsetX: 0,
          offsetY: 0,
          format: undefined,
          formatter: undefined,
          datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
          },
          //  categories: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
          title:{
              text: "Hours",
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                color: '#008FFB',
              }
            },

            title: {
              text: "µg/m³",
              style: {
                color: '#008FFB',
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
                show: false,
              },
              axisBorder: {
                show: false,
                color: '#008FFB'
              },
            labels: {
                show: false,
              style: {
                color: '#00E396',
              }
            },
        },
        {
            seriesName: 'PM2.5',
            axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
                color: '#008FFB'
              },
            labels: {
                show: false,
              style: {
                color: '#00E396',
              }
            },
        },
        {
            seriesName: 'PM10',
            axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
                color: '#008FFB'
              },
            labels: {
                show: false,
              style: {
                color: '#00E396',
              }
            },
        },
          
            {
              seriesName: 'dB',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#FEB019'
              },
              labels: {
                style: {
                  color: '#FEB019',
                },
              },
              title: {
                text: "Decibel Units",
                style: {
                  color: '#FEB019',
                }
              }
            },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
      series: [{
        name: 'NO2',
        title: "NO2",
        type: 'line',
        data: []
      }, {
        name: 'PM2.5',
        title: "PM2.5",
        data: []
      }, {
        name: 'PM10',
        title: "PM10",
        data: []
      },
      {
          name: 'dB',
          title: 'dB',
          type: 'line',
          data: []
        }],
    }
}

   dataresults () {
    axios.get('/api/web/reading/PM25/')
    .then((response) => {
        this.setState({
            series: [{
                name: 'NO2',
                title: "NO2",
                type: 'line',
                data: response.data.no2
              }, {
                name: 'PM2.5',
                title: "PM2.5",
                data: response.data.pm25
              }, {
                name: 'PM10',
                title: "PM10",
                data: response.data.pm10
              },
              {
                  name: 'dB',
                  type: 'line',
                  data: response.data.dB
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
      <Page className='averages-page' title='Averages' path={this.props.path} canGoBack fullWidth>
        <Section title='About'>
        <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="500" width="1000" />
      </div>
        </Section>
      </Page>
    )
  }
}

AveragesPage.propTypes = {
  path: PropTypes.string
}
