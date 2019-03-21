import React, { Component } from 'react';
import Tone from 'tone'
//import '../App.css'

import Sequencer from './seq/Sequencer';

class Synth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            synth: new Tone.Synth()
        }
        this.state.synth.toMaster();
    }
    triggerSynth = () => {
        this.state.synth.triggerAttackRelease('D3', '8n');
        console.log('triggered');
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
          <Sequencer triggerSynth={this.triggerSynth} />
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
