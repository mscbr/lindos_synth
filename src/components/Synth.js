import React, { Component } from 'react'
import Tone from 'tone'

//import '../App.css'

import Rows from './seq/Rows'
import ValuePicker from './seq/ValuePicker'
import Adsr from './adsr/Adsr'


class Synth extends Component {
  constructor(props) {
      super(props);
      this.state = {
        adsr: {
          ampAttack: 0.01,
          ampRelease: 0.4,
          filtAttack: 0.01,
          filtDecay: 0, 
        },
        sequenceValues: [''],
        sequencePosition: 0,
        sequenceLength: 32,
        bpm: 120,
        stepFocus: 0
      }

      ///INITIAL SET-UP FOR SYNTH & SEQUENCER
      this.synth = new Tone.DuoSynth(
        {
          "voice0": {
            "envelope": {
              "attack": this.state.adsr.ampAttack,
              "release": this.state.adsr.ampRelease
            },
            "filterEnvelope": {
              "attack": this.state.adsr.filtAttack,
              "decay": this.state.adsr.filtDecay
            },
            "oscillator": {
              "type": "triangle"
            },
            //"filterEmve"
          }
        }
      );
      console.log('state');
      console.log(this.state);
      // this.synth.voice0.envelope.attack = 0.4;
      // this.synth.voice0.envelope.release = 0.8;
      // this.synth.voice1.envelope.attack = 0.4;
      this.gain = new Tone.Gain(0.7).toMaster();
      
      this.synth.connect(this.gain);
      this.seq = new Tone.Sequence((time, value) => {
        this.positionSet();
        if(value !== "") {
          this.synth.triggerAttackRelease(value, "4n", time);
        }
        
      }, this.state.sequenceValues, "16n");
      Tone.Transport.setLoopPoints(0, '2m');
      Tone.Transport.loop = true;
  }

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

  componentDidUpdate(prevProps, prevState) {

    if (prevState.sequenceValues !== this.state.sequenceValues || prevState.sequenceLength !== this.state.sequenceLength) {
      this.seq.dispose();
      //assigning sequence with updated values to this.seq
      this.seq = new Tone.Sequence((time, value) => {
        this.positionSet();
        if(value !== "" && value !== '0') {
          this.synth.triggerAttackRelease(value, "8n", time);
        }
      }, this.state.sequenceValues.slice(0, this.state.sequenceLength), "16n").start();

      //sequence will only start if it was already playing
      if(Tone.Transport.state !== 'stopped') {
        this.stopSeq();
        this.triggerSeq();
      }
    }
    //ADSR values update
    if (prevState.adsr !== this.state.adsr) {
      this.synth.voice0.envelope.attack = this.state.adsr.ampAttack;
      this.synth.voice1.envelope.attack = this.state.adsr.ampAttack;
    }
  }

  //CURRENT SEQUENCE PROGRESS POSITION
  positionSet = () => {
    let position = Tone.Transport.position.slice();
    
    let seqPosVal = ((parseInt(position.slice(0, 1)%2))*16 + parseInt(position.slice(2,3))*4 + parseInt(position.slice(4,5)))%this.state.sequenceLength;
    this.setState({
      sequencePosition: seqPosVal
    })
  }

  handleStepFocus = (step) => {
    this.setState({
      stepFocus: step
    })
  }

  setSequenceVal = (seqenceValues) => {
    this.setState({
      sequenceValues: seqenceValues
    });
  }

  //BPM CHANGE
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
  //SEQ LENGTH CHANGE
  handleLengthToggle = (e) => {
    
    if (this.state.sequenceLength === 32) {
      this.setState({
        sequenceLength: 16
      });
      return;
    } else {
      this.setState({
        sequenceLength: 32
      });
      return;
    }
    
  }

  handleAdsr = (e) => {
    this.setState({
      adsr: {
        [e.target.id]: e.target.value
      }
    });
  }

  triggerSeq = () => {
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
  handlePlayButton = () => {
    if (Tone.Transport.state === 'stopped') {
      return (
        <button className='play-button' onClick={this.triggerSeq}>>>></button>
      );
    } else {
      return (
        <button className='pause-button' onClick={this.stopSeq}>| |</button>
      );
      
    }
  }
  
  //build a conditional render only for step sequencer
  //IF ONLY POS CHANGED ONLY RENDER ~~
  render() {
    const button = this.handlePlayButton();
    return (
      <div className="synth">
        <div className="oscillator">
          OSCILLATOR
        </div> 
        <div className="control">
          
          <div className="seq">
            <div className='seq-controls'>
              {button}
              <label htmlFor='bpm'>BPM:</label>
              <input name='bpm' id='bpm' type='number' value={this.state.bpm} step='0.01' 
                onChange={this.setBpmState} onBlur={this.setBpmTransport} 
                min='20' max={220}
                /> 
              <label className="length-switch">
                <input type="checkbox" onChange={this.handleLengthToggle} />
                <span className="slider round">
                  32/16
                </span>
              </label>
            </div>
            <Rows 
              seqPosition={this.state.sequencePosition}
              handleStepFocus={this.handleStepFocus}
              stepFocus={this.state.stepFocus}
              sequenceValues={this.state.sequenceValues}
            />
            <ValuePicker 
              handleStepFocus={this.handleStepFocus} 
              stepFocus={this.state.stepFocus}
              setSequenceVal={this.setSequenceVal}
            />
          </div>

          <div className="adsr">
            <p>ADSR</p>
            <hr />
            <Adsr 
              adsrVal={this.state.adsr} 
              handleAdsr={this.handleAdsr}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Synth;
