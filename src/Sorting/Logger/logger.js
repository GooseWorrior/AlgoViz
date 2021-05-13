import React from 'react';
import './logger.css';

export class Logger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            curStep: -1
        }
        this.addMessage = this.addMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.stepBackMessage = this.stepBackMessage.bind(this);
    }

    addMessage(message) {
        if (message[0] < this.state.content.length) {
            this.setState(prevState => ({
                curStep: message[0]
            }));
        } else {
            this.setState(prevState => ({
                content: [...prevState.content, message],
                curStep: message[0]
            }));
        }
    }

    stepBackMessage() {
        console.log(this.state);
        if (this.state.curStep > -1) {
            this.setState(prevState => ({
                curStep: prevState.curStep - 1
            }));
        }
    }

    clearMessage() {
        this.setState({
            content: [],
            curStep: -1
        })
    }

    componentDidUpdate() {
        console.log('update' + this.state.curStep);
        var scrollbar = document.getElementById('loggerScroll');
        scrollbar.scrollTop = Math.max(0, (this.state.curStep - 13) * Math.floor(500 / 21));
    }

    render() {
        const logs = this.state.content.map(message => {
            return (
              <li style={{ color: message[0] === this.state.curStep && this.props.mode === 'stepping' ? 'red' : 'white' }}>
                <span>{message[1] + ' Array[' + message[2] + '], Array[' + message[3] + '] ' +
                (message[1] === 'compare' ? '(Array[' + message[2] + '] ' + message[4] + ' Array[' + message[3] + '])' : '')}</span>
              </li>
            );
        });

        var status = 'Steps: ';
        return <div>
            <div>{status}</div>
            <div className='Logger' id='loggerScroll'>
                <ol>{logs}</ol>
            </div>
        </div>;
    }
}