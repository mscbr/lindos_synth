import React, { Component } from 'react'
import Tone from 'tone'

class TestStateComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            synth: new Tone.Synth()
        }
        this.state.synth.toMaster();
    }
    handlePlay = () => {
        this.state.synth.triggerAttackRelease('D3', '8n');
    }
    render() {
        return (
            <div>
                <p>UNI</p>
                <button onClick={this.handlePlay}>>>></button>
            </div>
        );
    }
}

export default TestStateComp