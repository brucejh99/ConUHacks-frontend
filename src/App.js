import React from 'react';
import logo from './logo.svg';
import './App.css';
import DonutChart from './components/DonutChart';

const serverPort = 9000;

const App = () => {

  const pieData = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
  };
  
  return (
    <div className="App">
      <DonutChart data={pieData} />
    </div>
  );
}

export default App;
