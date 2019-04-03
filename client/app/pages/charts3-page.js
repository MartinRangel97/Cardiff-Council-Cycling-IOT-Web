import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import ReactApexChart from 'react-apexcharts'

export default class NoiseCharts extends React.Component {
    
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
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Noise Pollution Readings for this Trip',
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
            name: "dB",
            data: [45, 67, 75, 59, 84, 93, 38, 60, 29, 62, 77, 28]
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



