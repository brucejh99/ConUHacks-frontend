import React, { Component } from 'react';
import Chart from 'chart.js';

export default class DonutChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "doughnut",
            data: this.props.data,
            options: {
                //Customize chart options
            }
        });
    }

    render() {
        const options = {

        }
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        );
    }
}
