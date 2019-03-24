import React, { Component } from 'react';
import Tone from 'tone'

//import '../App.css'

import Sequencer from './seq/Sequencer';

class Synth extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sequenceValues: [440,445,220,220],
          sequencePosition: 0
        }

        ///INITIAL SET-UP FOR SYNTH & SEQUENCER
        this.synth = new Tone.Synth().toMaster();
        this.seq = new Tone.Sequence((time, value) => {
          this.positionSet();
          this.synth.triggerAttackRelease(value, "16n", time);
        }, this.state.sequenceValues, "16n");
    }

    componentDidMount() {
      //INITIALLY SETTING UP RANDOMIZED SEQ VALUES
      // this.setState({
      //   sequenceValues: this.randomizeSequence()
      // });
    }
    componentDidUpdate(prevProps, prevState) {
      //updating sequence values
      if (prevState.sequenceValues !== this.state.sequenceValues) {
        this.seq = new Tone.Sequence((time, value) => {
          this.positionSet();
          this.synth.triggerAttackRelease(value, "16n", time);
        }, this.state.sequenceValues, "16n");
      }
    }
    positionSet = () => {let seqPosVal = (parseInt(Tone.Transport.position.slice(0,1))%2)*16 + parseInt(Tone.Transport.position.slice(2,3))*4 + parseInt(Tone.Transport.position.slice(4,5));
      this.setState({
        sequencePosition: seqPosVal
      })
    }
    setSequenceVal = (seqenceValues) => {
      this.setState({
        sequenceValues: seqenceValues
      });
    }

    // randomizeSequence = () => {
    //   let sequence = [];
    //   const { partch } = this.state;
    //   for (let i = 0; i < 32; i++) {
    //     sequence.push(i%4 ? 110 : i === 0 ?  2400 : partch[Math.floor(Math.random() * i)]);
    //   }
    //   return sequence;
    // }

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
      Tone.Transport.stop();
      this.seq.stop();
      this.setState({
        sequencePosition: 0
      })
    }
  render() {
     //console.log(this.state)
    return (
      <div className="synth">
        <div className="oscillator">
          OSCILLATOR
        </div> 
        <div className="control">
          <div className="seq">
          SEQ  {Tone.Transport.bpm.value}
          <Sequencer 
            triggerSeq={this.triggerSeq} 
            stopSeq={this.stopSeq} 
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
