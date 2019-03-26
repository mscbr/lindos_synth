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

class Rows extends Component {
  //put all state into ValuePicker, and transform to functional comp
  //++update propTypes
  //RENAME
  constructor(props) {
    super(props);
    this.state = {
      partch: [0, 62.96, 203.91, 111.73, 498, 315.64, 701.95, 764.91, 813.68, 1200],
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
    
    this.partchGreekCut = [0, 62.96, 203.91, 111.73, 498, 315.64, 701.95, 764.91, 813.68, 1200];
    this.partchFull = [21.5, 53.3, 84.5, 111.7, 150.6, 165, 182.4, 203.9, 231.2, 266.9, 294.1, 
      315.6, 347.4, 386.3, 417.5, 435.1, 470.8, 498, 519.6, 551.3, 582.5, 617.5, 648.7, 680.4, 
      702, 729.2, 764.9, 782.5, 813.7, 852.6, 884.4, 905.9, 933.1, 968.8, 996.1, 1017.6, 1035, 1049.4, 1088.3, 1115.5, 1146.7, 1178.5, 1200];
  }

  makeRow = () => {
    const steps = [];
    // const select = this.state.partch.map((value, i) => {
    //   return (
    //     <option value={value} key={`select${value}`}>{i}</option>
    //   );
    // })
    for(let i = 0; i < 32; i++) {
      
      steps.push(
        //ternary operation for marking a progress in step sequence
        i === this.props.seqPosition ? (
        <div style={{...stepStyle, 
          ...(i%4 ? {} : {background: 'rgba(3, 68, 136, 0.7)', color: 'rgba(255, 252, 246, 1)'}),
          ...(i===this.props.stepFocus ? {background: 'rgba(3, 68, 136, 1)'} : {})}} 
          key={`step${i}`}
          onClick={() => this.props.handleStepFocus(i)}
          >
          <div style={{...progressStyle, background: 'rgba(255, 252, 246, 0.7)'}}></div>
          {/* <select style={noteSelectStyle} onChange={(e) => this.setVal(e, i)}>
            <option value={null} defaultValue>--</option>
            {select}
          </select> */}
          <div className="value-display" style={valueDisplayStyle}>
           {this.state.sequenceValues[i] && this.state.sequenceValues[i].slice(0,4)}
          </div>
        </div>
        ) : (
        <div style={{...stepStyle, 
          ...(i%4 ? {} : {background: 'rgba(3, 68, 136, 0.7)', color: 'rgba(255, 252, 246, 1)'}),
          ...(i===this.props.stepFocus ? {background: 'rgba(3, 68, 136, 1)'} : {})}} 
          key={`step${i}`}
          onClick={() => this.props.handleStepFocus(i)}
          >
          <div style={progressStyle}></div>
          {/* <select style={noteSelectStyle} onChange={(e) => this.setVal(e, i)}>
            <option value="" defaultValue>--</option>
            {select}
          </select> */}
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
    //console.log(this.props);
    const steps = this.makeRow();
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
}

Rows.propTypes = {
  seqPosition: PropTypes.number
}

export default Rows;