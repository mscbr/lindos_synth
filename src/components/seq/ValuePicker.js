import React, { Component } from 'react'
import PropTypes from 'prop-types'

const valuePickerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '98%',
    margin: "-10px -5px"
}

class ValuePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
          scale: ['', 21.5, 53.3, 84.5, 111.7, 150.6, 165, 182.4, 203.9, 231.2, 266.9, 294.1, 
            315.6, 347.4, 386.3, 417.5, 435.1, 470.8, 498, 519.6, 551.3, 582.5, 617.5, 648.7, 680.4, 
            702, 729.2, 764.9, 782.5, 813.7, 852.6, 884.4, 905.9, 933.1, 968.8, 996.1, 1017.6, 1035, 1049.4, 1088.3, 1115.5, 1146.7, 1178.5, 1200],
          sequenceValues: [
            '', '', '', '',
            '', '', '', '', 
            '', '', '', '', 
            '', '', '', '', 
            '', '', '', '', 
            '', '', '', '', 
            '', '', '', '', 
            '', '', '', '', 
          ],
          stepFocus: props.stepFocus
        }
        
        this.partchGreekCut = [62.96, 203.91, 111.73, 498, 315.64, 701.95, 764.91, 813.68, 1200];
        this.partchFull = [21.5, 53.3, 84.5, 111.7, 150.6, 165, 182.4, 203.9, 231.2, 266.9, 294.1, 
          315.6, 347.4, 386.3, 417.5, 435.1, 470.8, 498, 519.6, 551.3, 582.5, 617.5, 648.7, 680.4, 
          702, 729.2, 764.9, 782.5, 813.7, 852.6, 884.4, 905.9, 933.1, 968.8, 996.1, 1017.6, 1035, 1049.4, 1088.3, 1115.5, 1146.7, 1178.5, 1200];
          
      }
    
    setScale = (scale) => {
        this.setState({
            scale: scale
        })
    }

    setVal = (e, i) => {
        
        let sequenceValues = [...this.state.sequenceValues];
        sequenceValues[i] = e.target.value;
        
        this.setState({
          sequenceValues: sequenceValues
        });
        
        this.props.setSequenceVal(sequenceValues);
      }
    
    render() {
        const valueButtons = this.state.scale.map((item) => {
            if (item === parseFloat(this.state.sequenceValues[this.props.stepFocus])) {
                return (
                    <label key={`scaleVal${item}`} className='radio-container'>
                        <span className='radio-label'>{parseInt(item)}<br />Hz</span>
                        <input checked type='radio' name='radio' value={item} onChange={(e) => this.setVal(e, this.props.stepFocus)} />
                        <span className='radio-checkmark'></span>
                    </label>
                )
            } else {
                return (
                    <label key={`scaleVal${item}`} className='radio-container'>
                        <span className='radio-label'>{parseInt(item)}<br />Hz</span>
                        <input type='radio' name='radio' value={item} onChange={(e) => this.setVal(e, this.props.stepFocus)} />
                        <span className='radio-checkmark'></span>
                    </label>
                )
            }
        })
        return (
        <div>
            <p>STEP: {this.props.stepFocus+1}</p>
        <div className='value-picker' style={valuePickerStyle}>
            {valueButtons}
            <label className='radio-container'>
                <span className='radio-label'>VOID</span>
                <input type='radio' name='radio' value='' onChange={(e) => this.setVal(e, this.props.stepFocus)} />
                <span className='radio-checkmark'></span>
            </label>
        </div>
        </div>
        )
    }
}

ValuePicker.propTypes = {
    stepFocus: PropTypes.number
  }

export default ValuePicker