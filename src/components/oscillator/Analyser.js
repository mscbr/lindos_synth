import React, {Component} from 'react'
import Partch from '../../partch301014b.png'


class Analyser extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidUpdate() {
        const dataArray = this.props.waveArr;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = 'rgba(255, 252, 246, 1)';
        ctx.lineWidth = 1;
        ctx.save();
        ctx.beginPath();
        ctx.clearRect(0, 0, 512, 160);
        let sliceWidth = 5000*1.0/dataArray.length;
        let x=0;
        for(let i = 0; i<dataArray.length; i++) {
            let v = i%3 ? dataArray[i] * (-1/3) : dataArray[i] * (-1/5) ;// / 128.0;
            let y = (v*2)+140/2;
            if(i===0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        ctx.stroke();
        
    }

    render() {
        

        return (
            <div>
                <img src={Partch} alt="harry partch" id='partch' />
                <canvas ref={this.canvasRef} id='analyser'></canvas>
            </div>
        )
    }
    
}

export default Analyser