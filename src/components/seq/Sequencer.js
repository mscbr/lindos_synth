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
  borderRadius: '100%'
}
const lightOn = {
  ...progressStyle,
  background: 'rgba(255, 252, 246, 0.7)',
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
  fontSize: 9
}

class Sequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partch: [1200.0,
        1178.49371,
        1146.727057,
        1115.532807,
        1088.268715,
        1049.362941,
        1034.995772,
        1017.596288,
        996.0899983,
        968.8259065,
        933.1290944,
        905.8650026,
        884.358713,
        852.5920594,
        813.6862861,
        782.4920359,
        764.9159047,
        729.2190927,
        701.9550009,
        680.4487113,
        648.6820576,
        617.4878074,
        582.5121926,
        551.3179424,
        519.5512887,
        498.0449991,
        470.7809073,
        435.0840953,
        417.5079641,
        386.3137139,
        347.4079406,
        315.641287,
        294.1349974,
        266.8709056,
        231.1740935,
        203.9100017,
        182.4037121,
        165.0042285,
        150.6370585,
        111.7312853,
        84.46719347,
        53.27294323,
        21.5062896,
        0.0
      ],
      sequenceValues: [
        "", "", "", "",
        "", "", "", "", 
        "", "", "", "", 
        "", "", "", "", 
        "", "", "", "", 
        "", "", "", "", 
        "", "", "", "", 
        "", "", "", "", 
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
        <div style={stepStyle} key={`step${i}`}>
          <div style={lightOn}></div>
          <select style={noteSelectStyle} onChange={(e) => this.setVal(e, i)}>
            <option value="" defaultValue>--</option>
            {select}
          </select>
        </div>
        ) : (
        <div style={stepStyle} key={`step${i}`}>
          <div style={progressStyle}></div>
          <select style={noteSelectStyle} onChange={(e) => this.setVal(e, i)}>
            <option value="" defaultValue>--</option>
            {select}
          </select>
          <div className="value-display" style={valueDisplayStyle}>
          {this.state.sequenceValues[i].slice(0,4)}
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
    //console.log(this.state);
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