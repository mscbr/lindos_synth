import React from 'react'


const Adsr = (props) => {
    console.log(props);
    const handleAdsr = (e) => {
        console.log(e.target.id);
    }
    return (
        <div className='adsr-sliders'>
            <div className="slider-wrapper">
                <input id="ampAttack" type="range" 
                    min={0.1} max={4} 
                    value={props.adsrVal.ampAttack} step={0.1} 
                    onChange={props.handleAdsr}
                />
            </div>
            <span>VAL: {props.adsrVal.ampAttack}</span>
        </div>
    );
}

export default Adsr