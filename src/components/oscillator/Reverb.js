import React from 'react'
import PropTypes from 'prop-types'

const Reverb = (props) => {
    return (
        <div className='reverb'>
            <span>REVERB</span>
            <hr />
            <div className="reverb-sliders">
                <div className="adsr-slider">
                    <span>DRY/WET</span>
                    <div className="slider-wrapper">
                        <input id="reverbWet" type="range" 
                            min={0} max={1} 
                            value={props.stateData[0]} step={0.1} 
                            onChange={props.handleChange}
                        />
                    </div>
                    <span>{props.stateData[0]}</span>
                </div>
                <div className="adsr-slider">
                    <span>ROOM SIZE</span>
                    <div className="slider-wrapper">
                        <input id="reverbRoomSize" type="range" 
                            min={0} max={1} 
                            value={props.stateData[1]} step={0.1} 
                            onChange={props.handleChange}
                        />
                    </div>
                    <span>{props.stateData[1]}</span>
                </div>
            </div>
        </div>
    );
}

Reverb.propTypes = {
    handleChange: PropTypes.func,
    stateData: PropTypes.array
}
export default Reverb