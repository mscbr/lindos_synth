import React, { Component } from 'react'
import Tone from 'tone'
import Sequencer from '../synth/Sequencer'

class TestStateComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            synth: new Tone.Synth()
        }
        this.state.synth.toMaster();
    }
    triggerSynth = () => {
        this.state.synth.triggerAttackRelease('D3', '8n');
    }
    render() {
        return (
            <div>
                <p>UNI</p>
                
            </div>
        );
    }
}

export default TestStateComp