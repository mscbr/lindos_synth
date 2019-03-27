import React from 'react'


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
                    <input id="filtSustain" type="range" 
                        min={0.1} max={1} 
                        value={props.adsrVal.filtSustain} step={0.1} 
                        onChange={props.handleAdsr}
                    />
                </div>
                <span>S: <br />{props.adsrVal.filtSustain}</span>
            </div>
            <div className="adsr-slider">
                <span>FILT</span>
                <div className="slider-wrapper">
                    <input id="filtDecay" type="range" 
                        min={0.1} max={2} 
                        value={props.adsrVal.filtDecay} step={0.1} 
                        onChange={props.handleAdsr}
                    />
                </div>
                <span>D: <br />{props.adsrVal.filtDecay}</span>
            </div>
        </div>
    );
}

export default Adsr