import React, { Component } from 'react'
import PropTypes from 'prop-types'

const rowStyle = {
  display: 'flex',
  //flexFlow: 'row wrap'

}
const stepStyle = {
  width: '5%',
  height: '8vh',
  border: '1px solid rgba(204, 221, 232, 1)',
  margin: 2,
  borderRadius: 3
}
const progressStyle = {
  width: 10,
  height: 10,
  border: '1px solid rgba(204, 221, 232, 0.7)',
  borderRadius: '100%'
}
const lightOn = {
  width: 10,
  height: 10,
  border: '1px solid rgba(204, 221, 232, 0.7)',
  borderRadius: '100%',
  background: 'rgba(23, 143, 214, 1)',
}
//CHANGE THIS TO FUNCTIONAL COMPONENT
export default class Sequencer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 0
        }
    }

    makeRow = () => {
      const steps = [];
      
      for(let i = 0; i < 32; i++) {
        steps.push(
          i === this.props.seqPosition ? (
          <div style={stepStyle} key={`step${i}`}>
            <div style={lightOn} index={`styleIndex${i}`}></div>
            {i}
          </div>
          ) : (
          <div style={stepStyle} key={`step${i}`}>
            <div style={progressStyle} index={`styleIndex${i}`}></div>
            {i}
          </div>
          )
          
        );
      }
      
      return steps;
    }

  render() {
    //console.log(this.props.seqPosition);
    const steps = this.makeRow();
    return (
      <div className='s'>
        <button onClick={this.props.triggerSeq}>>>></button>
        <button onClick={this.props.stopSeq}>|||</button>
        <div style={rowStyle}>
          {steps.map((step, index) => {
            return index<16 ? step : null;
          })}
        </div>
        <div style={rowStyle}>
          {steps.map((step, index) => {
            return index>15 ? step : null;
          })}
        </div>
      </div>
    )
  }
}

Sequencer.propTypes = {
  triggerSeq: PropTypes.func,
  stopSeq: PropTypes.func,
  seqPosition: PropTypes.number
}
