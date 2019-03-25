import React, { Component } from 'react';
import Tone from 'tone'

//import '../App.css'

import Sequencer from './seq/Sequencer';

class Synth extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sequenceValues: [''],
          sequencePosition: 0
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

    componentDidMount() {
      //INITIALLY SETTING UP RANDOMIZED SEQ VALUES
      // this.setState({
      //   sequenceValues: this.randomizeSequence()
      // });
    }
    componentDidUpdate(prevProps, prevState) {
      //updating sequence values
      //this.seq.stop();

      if (prevState.sequenceValues !== this.state.sequenceValues) {
        //this.setSequenceVal();

        this.seq = new Tone.Sequence((time, value) => {
          this.positionSet();
          if(value !== "") {
            this.synth.triggerAttackRelease(value, "16n", time);
          }
        }, this.state.sequenceValues, "16n").start();
        
        //doesnt work well
        Tone.Transport.position = "0:0:0";

       
      }
      
    }
    positionSet = () => {
      let position = Tone.Transport.position.slice();
      console.log('pos var: ', position);
      
      //++ set Tone.Transoprt.position itself!!
      let seqPosVal = (parseInt(position.slice(0, 1)%2))*16 + parseInt(position.slice(2,3))*4 + parseInt(position.slice(4,5));
      console.log('positionSeta: ', seqPosVal);
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
      Tone.Transport.stop(0);
      this.seq.stop(0);
      this.setState({
        sequencePosition: 0
      })
    }
  render() {
     console.log('SYNTH: ', this.state.sequencePosition);
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
