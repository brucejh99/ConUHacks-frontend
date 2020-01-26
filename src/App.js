import React from 'react';
import './App.css';
import request from 'request';
import DonutChart from './components/DonutChart';
import LineChart from './components/LineChart';

const serverPort = 9000;

const GRADIENT = [
  'red',
  '#1f77b4', // blue
  '#2ca02c', // green
  'yellow',
  'purple'
];

const activityReducer = data => 
  data.reduce((acc, curr) => 
    Object.keys(curr).length > 1 ? acc + curr[Object.keys(curr)[0]] : acc, 0);

const toPieDataset = data => {
  const activeCount = data['active'] ? activityReducer(data['active']) : 0;
  const recCount = data['recreational'] ? activityReducer(data['recreational']) : 0;
  const workCount = data['work'] ? activityReducer(data['work']) : 0;
  return {
    datasets: [
      {
        data: [activeCount, recCount, workCount],
        backgroundColor: GRADIENT
      }
    ],
    labels: [
        'Active',
        'Recreational',
        'Work'
    ]
  }
}

const toLineDataset = data => {
  let moods = [];
  let points = [];
  data['nodes'].forEach(node => {
    points.push(Object.keys(node)[0]);
    moods.push(node[Object.keys(node)[0]]);
  });
  return { moods, points }
}

class App extends React.Component {
    
    state = {
        pieData: null,
        lineData: null
    }

mockData = {
    'active': [
      {'running': 1, 'gym': 1},
      {'running': 1, 'arena': 1},
      {'running': 1, 'school': 1},
      {'playing': 1, 'videogames': 1},
      {'verb': 'running'}
    ],
    'recreational': [
      {'gaming': 1, 'videogames': 1},
      {'chilling': 1, 'nap': 1},
      {'verb': 'chill'}
    ],
    'work': [
      {'homework': 1, 'home': 1},
      {'chores': 1, 'home': 1},
      {'work': 1, 'office': 1},
      {'verb': 'running'}
    ],
    'nodes': [
      {1: 51.2},
      {2: 51.2},
      {3: 51.2},
      {4: 81.10000000000001},
      {5: 80.80000000000001},
      {6: 80.80000000000001}
    ],
    'final': [
      {
        'average': 66.05000000000001
      }
    ]
  }
  
    componentDidMount() {
        const options = {
          url: 'http://localhost:9000/a/',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        };
        request.get('http://localhost:9000/a/', (err, res, body) => {
            console.log(err);
            console.log(res);
            console.log(body);
            this.setState({
                pieData: toPieDataset(body.content),
                lineData: toLineDataset(body.content)
            });
        });
        
    }
    
    render() {
        return (
    (this.state.pieData && this.state.lineData) ?
            <div>
        <DonutChart data={this.state.pieData} />
        <LineChart data={this.state.lineData} />
      </div> : null
        );
    }
}

export default App;
