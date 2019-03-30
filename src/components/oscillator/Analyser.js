import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
        ctx.lineWidth = 512;
        ctx.save();
        ctx.beginPath();
        const H = 160;
        const W = 512;
        let h = H/dataArray.length;
        let x = W - 1;
        ctx.fillStyle = 'hsl(211, 95.7%, 27.3%)';
        ctx.fillRect(0, 0, W, H);
        for(let i = 0; i<dataArray.length; i++) {
            let rat = dataArray[i] / (255);
            let hue = Math.round((rat*120)+280%360);
            let sat = '20%';
            let lit = Math.round(10 + (-100*rat)) + '%';
            ctx.strokeStyle = `hsl(${30+hue}, ${sat}, ${lit})`;
            x -= (0.4*i%512%256)*rat*(-5);
            ctx.moveTo(x, H - (i*h));
            ctx.lineTo(x, H - (i*h+h));
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


Analyser.propTypes = {
    waveArr: PropTypes.object
}
export default Analyser