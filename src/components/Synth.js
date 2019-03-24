import React, { Component } from 'react';
import Tone from 'tone'

//import '../App.css'

import Sequencer from './seq/Sequencer';

class Synth extends Component {
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
            0.0],
          sequenceValues: [440,445,220,220],
          sequencePosition: 0
        }

        ///INITIAL SET-UP FOR SYNTH & SEQUENCER
        this.synth = new Tone.Synth().toMaster();
        this.seq = new Tone.Sequence((time, value) => {
          console.log(Tone.Transport.position.slice(2,5));
          this.positionSet();
          
          this.synth.triggerAttackRelease(value, "16n", time);
        }, this.state.sequenceValues, "16n");
       
        
    }
    componentDidMount() {
      //INITIALLY SETTING UP RANDOMIZED SEQ VALUES
      this.setState({
        sequenceValues: this.randomizeSequence()
      });
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
    randomizeSequence = () => {
      let sequence = [];
      const { partch } = this.state;
      for (let i = 0; i < 32; i++) {
        sequence.push(i%4 ? 110 : i === 0 ?  2400 : partch[Math.floor(Math.random() * i)]);
      }
      return sequence;
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
      Tone.Transport.stop();
      this.seq.stop();
      this.setState({
        sequencePosition: 0
      })
    }
  render() {
    
    return (
      <div className="synth">
        <div className="oscillator">
          OSCILLATOR
        </div> 
        <div className="control">
          <div className="seq">
          SEQ  {Tone.Transport.bpm.value}
          <Sequencer triggerSeq={this.triggerSeq} stopSeq={this.stopSeq} seqPosition={this.state.sequencePosition} />
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
