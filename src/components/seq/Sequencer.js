import React, { Component } from 'react'
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
  borderRadius: '100%',
  background: 'transparent'
}

const noteSelectStyle = {
  maxWidth: '99%',
  background: 'rgba(204, 221, 232, 1)',
  color: 'rgba(255, 252, 246, 1)',
  border: 'none',
  cursor: 'pointer'
}
const valueDisplayStyle = {
  maxWidth: '100%',
  fontSize: '0.8rem',
  textAlign: 'center'
}

class Sequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partch: [0.000,  30.772,  60.625,  89.612,  117.783,  145.182,  171.850,  197.826,  223.144,  247.836,  271.934,  295.464,  318.454,  
        340.927,  362.905,  384.412,  405.465,  426.084,  446.287,  466.090,  
        485.508,  504.556,  523.248,  541.597,  559.616,  577.315,  594.707,  611.802,  628.609,  645.138,  661.398,  677.399,  693.147
      ],
      sequenceValues: [
        '', '', '', '',
        '', '', '', '', 
        '', '', '', '', 
        '', '', '', '', 
        '', '', '', '', 
        '', '', '', '', 
        '', '', '', '', 
        '', '', '', '', 
      ]
    }
  }

  makeRow = () => {
    const steps = [];
    const select = this.state.partch.map(value => {
      return (
        <option value={value} key={`select${value}`}>{value}</option>
      );
    })
    for(let i = 0; i < 32; i++) {
      
      steps.push(
        //ternary operation for marking a progress in step sequence
        i === this.props.seqPosition ? (
        <div style={{...stepStyle, ...(i%4 ? {} : {background: 'rgba(3, 68, 136, 0.7)', color: 'rgba(255, 252, 246, 1)'})}} key={`step${i}`} >
          <div style={{...progressStyle, background: 'rgba(255, 252, 246, 0.7)'}}></div>
          <select style={noteSelectStyle} onChange={(e) => this.setVal(e, i)}>
            <option value={null} defaultValue>--</option>
            {select}
          </select>
          <div className="value-display" style={valueDisplayStyle}>
           {this.state.sequenceValues[i] && this.state.sequenceValues[i].slice(0,4)}
          </div>
        </div>
        ) : (
        <div style={{...stepStyle, ...(i%4 ? {} : {background: 'rgba(3, 68, 136, 0.7)', color: 'rgba(255, 252, 246, 1)'})}} key={`step${i}`}>
          <div style={progressStyle}></div>
          <select style={noteSelectStyle} onChange={(e) => this.setVal(e, i)}>
            <option value="" defaultValue>--</option>
            {select}
          </select>
          <div className="value-display" style={valueDisplayStyle}>
           {this.state.sequenceValues[i] && this.state.sequenceValues[i].slice(0,4)}
          </div>
        </div>
        )
      );
    }
    return steps;
  }
  setVal = (e, i) => {
    //console.log(e.target.value);
    let sequenceValues = this.state.sequenceValues.slice();
    sequenceValues[i] = e.target.value;
    this.setState({
      sequenceValues: sequenceValues
    });
    this.props.setSequenceVal(sequenceValues);
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

export default Sequencer;