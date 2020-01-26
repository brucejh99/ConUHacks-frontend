import React, { Component } from 'react';
import Chart from 'chart.js';
import pattern from 'patternomaly';

export default class DonutChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const ctx = this.chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: "doughnut",
            data: this.props.data
        });
    }

    render() {
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
