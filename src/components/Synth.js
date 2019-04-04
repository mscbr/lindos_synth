import React, { Component } from 'react'
import Tone from 'tone'

import Rows from './seq/Rows'
import ValuePicker from './seq/ValuePicker'
import Adsr from './adsr/Adsr'
import Analyser from './oscillator/Analyser'
import WaveSelector from './oscillator/WaveSelector'
import Reverb from './oscillator/Reverb'
import Recorder from './oscillator/Recorder'
import Logo from '../lindos-synth-logo.png'


class Synth extends Component {
  constructor(props) {
      super(props);
      this.state = {
        adsr: {
          ampAttack: 0.01,
          ampRelease: 0.4,
          filtFreq: 1800,
          oscHarm: 1.2, 
        },
        voice0: 'sine',
        voice1: 'sine',
        reverbWet: 0.0,
        reverbRoomSize: 0.5,
        sequenceValues: [''],
        sequencePosition: 0,
        sequenceLength: 32,
        bpm: 120,
        gain: 0.7,
        stepFocus: 0
      }

      ///INITIAL SET-UP FOR SYNTH & SEQUENCER
      this.synth = new Tone.DuoSynth({
        "harmonicity": 1.2
      });
      this.gain = new Tone.Gain(0.7).toMaster();
      this.lowPass = new Tone.Filter(18000, 'lowpass', (-24));
      this.reverb = new Tone.JCReverb({
        wet: 0.0
      });
      this.hiPass = new Tone.EQ3({        
        low: -Infinity,
        mid: 0,
        high: 0,
        lowFrequency: 600 ,
        highFrequency: 2500
      }) 
      //RECORDER SETUP
      this.actx = Tone.context;
      this.dest = this.actx.createMediaStreamDestination();
      this.recorder = new MediaRecorder(this.dest.stream);
      
      this.synth.connect(this.lowPass.connect(this.reverb.connect(this.hiPass.connect(this.gain))));
      this.gain.connect(this.dest);
      this.seq = new Tone.Sequence((time, value) => {
        this.positionSet();
        if(value !== "" && value !== '0') {
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
    this.gain.gain.value = this.state.gain;
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
      //AMP ATTACK
      this.synth.voice0.envelope.attack = this.state.adsr.ampAttack;
      this.synth.voice1.envelope.attack = this.state.adsr.ampAttack;
      //AMP RELEASE
      this.synth.voice0.envelope.release = this.state.adsr.ampRelease;
      this.synth.voice1.envelope.release = this.state.adsr.ampRelease;
      //OSC HARMONICS
      this.synth.harmonicity.value = this.state.adsr.oscHarm;
      //FILTER FREQ
      this.lowPass.frequency.value = this.state.adsr.filtFreq;
    }
    //OSCILLATORS WAVE type update
    if (prevState.voice0 !== this.state.voice0 || prevState.voice1 !== this.state.voice1) {
      this.synth.voice0.oscillator.type = this.state.voice0;
      this.synth.voice1.oscillator.type = this.state.voice1;
    }
    if(prevState.reverbWet !== this.state.reverbWet || prevState.reverbRoomSize !== this.state.reverbRoomSize) {
      this.reverb.wet.value = this.state.reverbWet;
      this.reverb.roomSize.value = this.state.reverbRoomSize;
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
  //HANDLING CHANGE OF 'ADSR' VALUES
  handleAdsr = (e) => {
    this.setState({
      adsr: {
        ...this.state.adsr,
        [e.target.id]: parseFloat(e.target.value)
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
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  render() {
    console.log(this.state.sequenceValues[this.state.sequencePosition]);
    const button = this.handlePlayButton();
    return (
      <div className="synth">
        <div className="oscillator">
          <div className='scope'>
            <Analyser note={this.state.sequenceValues[this.state.sequencePosition]} />
          </div>
          <button id="sustain-button" 
            onMouseDown={(e) => {
              this.synth.triggerAttack('D4');
              this.setState({});
            }}
            onMouseUp={() => this.synth.triggerRelease()}
          >♩</button>
          <WaveSelector handleChange={this.handleChange} />
          <Reverb handleChange={this.handleChange} stateData={[this.state.reverbWet, this.state.reverbRoomSize]} />
          <Recorder recorder={this.recorder} />
          <div className="logo">
            <img src={Logo} alt='lindos synth logo' id='lindos-synth-logo' />
          </div>
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
            <p>ARFH</p>
            <hr />
            <Adsr 
              adsrVal={this.state.adsr} 
              handleAdsr={this.handleAdsr}
            />
            <hr />
            <div className="master-slider">
              <input id="gain" type="range"
                min={0} max={1} step={0.01}
                value={this.state.gain}
                onChange={this.handleChange}
              />
              <span>MASTER: {this.state.gain}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Synth;
