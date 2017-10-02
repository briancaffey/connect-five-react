import React, { Component } from 'react';
import './App.css';
import { Board } from './components/Board'

class App extends Component {
  render() {
    return (
      <Board dims={[5, 6]}/>
    );
  }
}

export default App;
