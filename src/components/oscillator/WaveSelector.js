import React from 'react'
import PropTypes from 'prop-types'

const WaveSelector = (props) => {

    return (
        <div className='wave-selector' >
            <label>OSC 1</label>
            <select name='voice0' id='voice0' onChange={props.handleChange}>
                <option defaultValue value="sine">sine</option>
                <option value="triangle">triangle</option>
                <option value="sawtooth">sawtooth</option>
                <option value="square">square</option>
            </select>
            <label>OSC 2</label>
            <select name='voice1' id='voice1' onChange={props.handleChange}>
                <option defaultValue value="sine">sine</option>
                <option value="triangle">triangle</option>
                <option value="sawtooth">sawtooth</option>
                <option value="square">square</option>
            </select>
        </div>
    )
}

WaveSelector.propTypes = {
    handleChange: PropTypes.func
}

export default WaveSelector