import React from 'react'
import PropTypes from 'prop-types'

const rowStyle = {
  display: 'flex',
  //flexFlow: 'row wrap'

}
const stepStyle = {
  width: '5%',
  height: '8vh',
  background: 'rgba(204, 221, 232, 1)',
  border: '1px solid rgba(3, 68, 136, 1)',
  margin: 2,
  borderRadius: 3
}
const progressStyle = {
  width: 10,
  height: 10,
  margin: '2px auto',
  border: '1px solid rgba(255, 252, 246, 1)',
  borderRadius: '100%'
}
const lightOn = {
  ...progressStyle,
  background: 'rgba(255, 252, 246, 0.7)',
}

const Sequencer = (props) => {
  
  const makeRow = () => {
    const steps = [];
    
    for(let i = 0; i < 32; i++) {
      steps.push(
        //ternary operation for marking a progress in step sequence
        i === props.seqPosition ? (
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

  const steps = makeRow();
  return (
    <div className='s'>
      <button onClick={props.triggerSeq}>>>></button>
      <button onClick={props.stopSeq}>|||</button>
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

Sequencer.propTypes = {
  triggerSeq: PropTypes.func,
  stopSeq: PropTypes.func,
  seqPosition: PropTypes.number
}

export default Sequencer;