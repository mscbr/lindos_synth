import React, { Component } from 'react'
import Logo from '../../lindos-synth-logo.png'

class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordings: []
        }
        this.audioRef = React.createRef();
    }
    
    handleRecordStart = () => {
        let chunks = [];
        this.props.recorder.start();
        this.props.recorder.ondataavailable = (evt) => {
            chunks.push(evt.data);
        }
        this.setState({
            recordings: chunks
        });
        
    }
    handleRecordStop = () => {
        this.props.recorder.stop();
        const audio = this.audioRef.current;
        this.props.recorder.onstop = (evt) => {
            let blob = new Blob(this.state.recordings, { type: 'audio/wav; codecs=opus'});
            audio.src = URL.createObjectURL(blob);
        }
        this.setState({});
    }
    handleRecordBtn = () => {
        return this.props.recorder.state === 'recording' ? (
            <button className='recorder-stop' onClick={this.handleRecordStop}>STOP</button>
        ) : (
            <button className='recorder-record' onClick={this.handleRecordStart}>RECORD</button>
        );
    }



    render () {
        const recordBtn = this.handleRecordBtn();
        return (
            <div className='recorder'>
                <div className="recorder-playback">
                    <audio ref={this.audioRef} controls></audio>
                </div>
                <div className="recorder-controls">
                    {recordBtn}
                </div>
                <div className="recorder-logo">
                    <img src={Logo} alt='lindos synth logo' id='lindos-synth-logo' />
                </div>
            </div>
        ); 
    }
    
}

export default Recorder