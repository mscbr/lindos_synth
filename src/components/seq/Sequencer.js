import React, { Component } from 'react'

export default class Sequencer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggerSynth: props.triggerSynth
        }
    }
  render() {
      console.log(this.state);
    return (
      <div>
        <button onClick={this.state.triggerSynth}>>>></button>
      </div>
    )
  }
}
