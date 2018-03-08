import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Battleship from './views/Battleship';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Battleship />
      </div>
    );
  }
}

export default App;
