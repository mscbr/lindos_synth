import React, {Component} from 'react'



class Analyser extends Component {
    constructor(props) {
        super(props);
        
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        //this.updateCanvas();
        
    }
    componentDidUpdate() {
        //this.updateCanvas();
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
                //console.log(x, y);
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
            //ctx.stroke();
        }
        ctx.stroke();
        
    }
    updateCanvas() {
        let ctx = this.refs.canvas.getContext('2d');
        
        ctx.strokeStyle = 'rgba(255, 252, 246, 1)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        let sliceWidth = 512*1.0/this.dataArray.length;
        let x=0;
        for(let i = 0; i<this.dataArray.length; i++) {
            let v = this.dataArray[i] / 128.0;
            let y = v*140/2;
            if(i===0) {
                ctx.moveTo(x, y);
            } else {
                //console.log(x, y);
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        
        // ctx.moveTo(0, 70);
        // ctx.lineTo(100, 45);
        // ctx.lineTo(256, 75);

        // ctx.lineTo(512, 60);
        ctx.stroke();
        //this.setState();
    }

    render() {
        

        return (
            <div>
                <canvas ref={this.canvasRef} id='analyser'></canvas>
            </div>
        )
    }
    
}

export default Analyser