import React, { Component } from 'react';
import Chart from 'chart.js';

export default class LineChart extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                // Bring in data
                labels: this.props.data.points,
                datasets: [
                    {
                        label: this.props.data.points,
                        data: this.props.data.moods,
                        borderColor: 'purple'
                    }
                ]
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
