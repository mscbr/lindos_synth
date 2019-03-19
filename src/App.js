import React, { Component } from 'react';
import TestStateComp from './components/synth/TestStateComp'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="test-state-comp">
          <TestStateComp />
        </div> 
      </div>
    );
  }
}

export default App;
