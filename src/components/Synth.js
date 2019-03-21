import React, { Component } from 'react';
import Tone from 'tone'

//import '../App.css'

import Sequencer from './seq/Sequencer';

class Synth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        
    }
    componentDidMount() {
      this.synth = new Tone.Synth();
      this.synth.toMaster();
      console.log(this.synth);
      this.seq = new Tone.Sequence((time, value) => {
        console.log(this.synth);
        this.synth.triggerAttackRelease(value, "16n", time);
      }, ["C4", "E2"], "16n");
      //this.seq.loop = true;
      
    }
    triggerSeq = () => {
      this.seq.start();
      Tone.Transport.start();
    }
    stopSeq = () => {
      Tone.Transport.stop();
      this.seq.stop();
    }
  render() {
    return (
      <div className="synth">
        <div className="oscillator">
          OSCILLATOR
        </div> 
        <div className="control">
          <div className="seq">
          SEQ
          <Sequencer triggerSeq={this.triggerSeq} stopSeq={this.stopSeq} />
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
