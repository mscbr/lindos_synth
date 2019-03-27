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
  margin: 4,
  borderRadius: 3,
  cursor: 'pointer'
}
const progressStyle = {
  width: 10,
  height: 10,
  margin: '2px auto',
  border: '1px solid rgba(255, 252, 246, 1)',
  borderRadius: '100%',
  background: 'transparent'
}

const valueDisplayStyle = {
  maxWidth: '100%',
  fontSize: '0.8rem',
  textAlign: 'center'
}

const Rows = (props) => {
  //put all state into ValuePicker, and transform to functional comp
  //++update propTypes
  //RENAME

  const makeRow = () => {
    const steps = [];
    for(let i = 0; i < 32; i++) {
      steps.push(
        //ternary operation for marking a progress in step sequence
        i === props.seqPosition ? (
        <div style={{...stepStyle, 
          ...(i%4 ? {} : {background: 'rgba(3, 68, 136, 0.7)', color: 'rgba(255, 252, 246, 1)'}),
          ...(i===props.stepFocus ? {background: 'rgba(3, 68, 136, 1)'} : {})}} 
          key={`step${i}`}
          onClick={() => props.handleStepFocus(i)}
          >
          <div style={{...progressStyle, background: 'rgba(255, 252, 246, 0.7)'}}></div>
          <div className="value-display" style={valueDisplayStyle}>
          {props.sequenceValues[i] && props.sequenceValues[i].slice(0,4)}
          </div>
        </div>
        ) : (
        <div style={{...stepStyle, 
          ...(i%4 ? {} : {background: 'rgba(3, 68, 136, 0.7)', color: 'rgba(255, 252, 246, 1)'}),
          ...(i===props.stepFocus ? {background: 'rgba(3, 68, 136, 1)'} : {})}} 
          key={`step${i}`}
          onClick={() => props.handleStepFocus(i)}
          >
          <div style={progressStyle}></div>
          <div className="value-display" style={valueDisplayStyle}>
           {props.sequenceValues[i] && props.sequenceValues[i].slice(0,4)}
          </div>
        </div>
        )
      );
    }
    return steps;
  }
  
  const steps = makeRow();
  return (
    <div className='sequence-steps'>
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

Rows.propTypes = {
  seqPosition: PropTypes.number,
  handleStepFocus: PropTypes.func,
  stepFocus: PropTypes.number,
  sequenceValues: PropTypes.array
}

export default Rows;