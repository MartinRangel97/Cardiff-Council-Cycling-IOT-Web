import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import ReactApexChart from 'react-apexcharts'

export default class AirCharts extends React.Component {
    
    constructor(props) {
      super(props);

      this.state = {
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
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Air Pollution Readings for this Trip',
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

            categories: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            title:{
                text: "Hours",
            },
        },
        
          yaxis: {
            title: {
              text: "µg/m³"
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
            name: "PM 2.5",
            data: [9, 41, 24, 38, 49, 25, 12, 47, 58, 33, 28, 14, 32]
          },
          {
            name: "PM 10",
            data: [12, 50, 32, 59, 42, 67, 75, 49, 30, 22, 63, 8, 18]
          }

        ],
      }
    }


    render() {

      return (
        

          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
          </div>
  

      );
    }

}



