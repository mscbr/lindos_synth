 import React from 'react'
 import PropTypes from 'prop-types'


const Adsr = (props) => {
    
    return (
        <div className='adsr-sliders'>
            <div className="adsr-slider">
                <span>AMP</span>
                <div className="slider-wrapper">
                    <input id="ampAttack" type="range" 
                        min={0.1} max={4} 
                        value={props.adsrVal.ampAttack} step={0.1} 
                        onChange={props.handleAdsr}
                    />
                </div>
                <span>A: <br />{props.adsrVal.ampAttack}</span>
            </div>
            <div className="adsr-slider">
                <span>AMP</span>
                <div className="slider-wrapper">
                    <input id="ampRelease" type="range" 
                        min={0.1} max={3} 
                        value={props.adsrVal.ampRelease} step={0.1} 
                        onChange={props.handleAdsr}
                    />
                </div>
                <span>R: <br />{props.adsrVal.ampRelease}</span>
            </div>
            <div className="adsr-slider">
                <span>FILT</span>
                <div className="slider-wrapper">
                    <input id="filtFreq" type="range" 
                        min={25} max={1800} 
                        value={props.adsrVal.filtFreq} step={10} 
                        onChange={props.handleAdsr}
                    />
                </div>
                <span>FREQ: <br />{props.adsrVal.filtFreq}</span>
            </div>
            <div className="adsr-slider">
                <span>OSC</span>
                <div className="slider-wrapper">
                    <input id="oscHarm" type="range" 
                        min={0} max={2} 
                        value={props.adsrVal.oscHarm} step={0.01} 
                        onChange={props.handleAdsr}
                    />
                </div>
                <span>HARM: <br />{props.adsrVal.oscHarm}</span>
            </div>
        </div>
    );
}


Adsr.propTypes = {
    adsrVal: PropTypes.object,
    handleAdsr: PropTypes.func
}
export default Adsr