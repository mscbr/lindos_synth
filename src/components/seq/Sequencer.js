import React, { Component } from 'react'

const rowStyle = {
  display: 'flex',
  //flexFlow: 'row wrap'

}
const stepStyle = {
  width: '5%',
  height: '3vh',
  border: '1px solid red',
}

export default class Sequencer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggerSeq: props.triggerSeq,
            stopSeq: props.stopSeq
        }
    }

    makeRow = () => {
      const steps = [];
      
      for(let i = 0; i < 33; i++) {
        steps.push(
          <div style={stepStyle}>
          {i}
          </div>
        );
      }
      
      return steps;
    }

  render() {
    const steps = this.makeRow();
    console.log(steps);
    return (
      <div className='s'>
        <button onClick={this.state.triggerSeq}>>>></button>
        <button onClick={this.state.stopSeq}>|||</button>
        <div style={rowStyle}>
          {steps.map((step, index) => {
            return index<16 ? step : null;
          })}
        </div>
      </div>
    )
  }
}
