import React from 'react'
import PropTypes from 'prop-types'


const Analyser = (props) => {
    let layer1 = React.createRef();
    //DO: css class assignment
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
    
    console.log(layer1);
    return (
        <div>
            <div className="fract-wrapper">
                <div ref={layer1} className="layer1" id="layer1">
                    {layers}
                </div>
            </div>
            <div id='analyser'></div>
        </div>
    )
}


Analyser.propTypes = {
    waveArr: PropTypes.object
}
export default Analyser