import React, { Component } from 'react';
import Tone from 'tone'

//import '../App.css'

import Rows from './seq/Rows';

class Synth extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sequenceValues: [''],
        sequencePosition: 0,
        bpm: 120
      }

      ///INITIAL SET-UP FOR SYNTH & SEQUENCER
      this.synth = new Tone.Synth().toMaster();
      this.seq = new Tone.Sequence((time, value) => {
        this.positionSet();
        if(value !== "") {
          this.synth.triggerAttackRelease(value, "16n", time);
        }
        
      }, this.state.sequenceValues, "16n");
      Tone.Transport.setLoopPoints(0, '2m');
      Tone.Transport.loop = true;
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.sequenceValues !== this.state.sequenceValues) {
      //assigning sequence with updated values to this.seq
      this.seq = new Tone.Sequence((time, value) => {
        this.positionSet();
        if(value !== "") {
          this.synth.triggerAttackRelease(value, "16n", time);
        }
      }, this.state.sequenceValues, "16n").start();

      //sequence will only start if it was already playing
      if(Tone.Transport.state !== 'stopped') {
        console.log(Tone.Transport.state);
        this.stopSeq();
        this.triggerSeq();
      }
    }
  }
  positionSet = () => {
    let position = Tone.Transport.position.slice();
    
    let seqPosVal = (parseInt(position.slice(0, 1)%2))*16 + parseInt(position.slice(2,3))*4 + parseInt(position.slice(4,5));
    this.setState({
      sequencePosition: seqPosVal
    })
  }
  setSequenceVal = (seqenceValues) => {
    this.setState({
      sequenceValues: seqenceValues
    });
  }
  setBpmState = (e) => {
    this.setState({
      bpm: e.target.value > 220 ? 220 : e.target.value 
    });
  }
  setBpmTransport = () => {
    if(this.state.bpm < 20) {
      this.setState({
        bpm: 20
      })
    }
    Tone.Transport.bpm.rampTo(this.state.bpm > 20 ? this.state.bpm : 20, 2);
  }

  triggerSeq = () => {
    //###########################################################################
    //###with code below you can create (w/ chrome) chip-sound effect on synth###
    //###########################################################################
    // this.setState({
    //   sequenceValues: this.randomizeSequence()
    // })
  
    this.seq.start();
    Tone.Transport.start();
  }
  stopSeq = () => {
    Tone.Transport.stop(0);
    this.seq.stop(0);
    Tone.Transport.position = "0:0:0";
    this.setState({
      sequencePosition: 0
    })
  }
  //build a conditional render only for step sequencer
  //IF ONLY POS CHANGED ONLY RENDER ~~
  render() {
    
    return (
      <div className="synth">
        <div className="oscillator">
          OSCILLATOR
        </div> 
        <div className="control">
          
          <div className="seq">
            <label htmlFor='bpm'>BPM:</label>
            <input name='bpm' id='bpm' type='number' value={this.state.bpm} step='0.01' 
              onChange={this.setBpmState} onBlur={this.setBpmTransport} 
              min='20' max={220}
              /> 
            <button onClick={this.triggerSeq}>>>></button>
            <button onClick={this.stopSeq}>|||</button>
            <Rows 
              seqPosition={this.state.sequencePosition}
              setSequenceVal={this.setSequenceVal} 
            />
          </div>

          <div className="adsr">
          ADSR
          </div>
        </div>
      </div>
    );
  }
}

export default Synth;
