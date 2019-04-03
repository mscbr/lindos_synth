import React from 'react'


const Analyser = (props) => {
    let counter = 0
    const divLayer = () => {
        counter++; 
        if (counter < 15) {
            return (
                <div className='color-down' >{divLayer()}</div>
            )
        } else {
            return;
        }
    }
    const layers = divLayer();
    return (
        <div>
            <div className="fract-wrapper">
                <div className="layer1" id="layer1">
                    {layers}
                </div>
            </div>
            <div id='analyser'></div>
        </div>
    )
}

export default Analyser