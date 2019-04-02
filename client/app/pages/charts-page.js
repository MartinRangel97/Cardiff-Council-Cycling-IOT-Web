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
                id: "chart1",
              chart: {
                shadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 1
                },
                toolbar: {
                  show: false
                }
              },
            //   colors: ['#77B6EA', '#545454'],
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Air Pollution over the last 24 Hours',
                align: 'left'
              },
              grid: {
                borderColor: '#e7e7e7',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              markers: {
                
                size: 4
              },
              xaxis: {
                categories: ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm"],
                title: {
                  text: 'Hour'
                },
    
              },
              yaxis: {
                title: {
                    text: 'µg/m³'
                  },
                min: 0,
                max: 350
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
            },
            series: [
              {
                name: "NO2",
                data: [48, 76, 18, 206, 335, 196, 256, 295, 340, 136, 84, 177, 51]
              },
              {
                name: "PM2.5",
                data: [9, 41, 24, 38, 49, 25, 12, 47, 58, 33, 28, 14, 32]
              },
              {
                name: "PM10",
                data: [12, 50, 32, 59, 42, 67, 75, 49, 30, 22, 63, 8, 18]
              },
            ],
          }

//  ------------------------------------------------------------------

        this.state = {
            id: "chart2",
            options: {
              chart: {
                shadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 1
                },
                toolbar: {
                  show: false
                }
              },
            //   colors: ['#77B6EA', '#545454'],
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Noise Pollution over the last 24 Hours',
                align: 'left'
              },
              grid: {
                borderColor: '#e7e7e7',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              markers: {
                
                size: 4
              },
              xaxis: {
                categories: ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm"],
                title: {
                  text: 'Hour'
                },
    
              },
              yaxis: {
                title: {
                    text: 'Decibel Units'
                  },
                min: 0,
                max: 150
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
            },
            series: [
              {
                name: "dB",
                data: [45, 52, 84, 63, 22, 55, 71, 59, 38, 33, 86, 49, 53]
              }
            ],
          }
        }
        
        
        render() {
    
          return (
            
            <div id="graphs">
                <div id="chart">
                    <ReactApexChart id="chart1" options={this.state.options} series={this.state.series} type="line" height="350" />
                    <ReactApexChart id="chart2" options={this.state.options} series={this.state.series} type="line" height="350" />
              </div>
            </div>
        
    
          );
        }
    }
    
    //   const domContainer = document.querySelector('#charts-page');
    //   ReactDOM.render(React.createElement(LineChart), domContainer);
    

