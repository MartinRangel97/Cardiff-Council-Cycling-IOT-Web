import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts'


export default class ChartsPage extends React.Component {
    
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
              categories: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
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
                  enabled: true
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
            data: [48, 76, 18, 206, 335, 196, 256, 295, 340, 136, 84, 177, 51]
          }, {
            name: 'PM2.5',
            title: "PM2.5",
            data: [9, 41, 24, 38, 49, 25, 12, 47, 58, 33, 28, 14, 32]
          }, {
            name: 'PM10',
            title: "PM10",
            data: [12, 50, 32, 59, 42, 67, 75, 49, 30, 22, 63, 8, 18]
          },
          {
              name: 'dB',
              type: 'line',
              data: [45, 67, 75, 59, 84, 93, 38, 60, 29, 62, 77, 28]
            }],
        }
      }
  
      render() {
        return (
          
  
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" width="480" />
          </div>
  
  
        );
      }
    }