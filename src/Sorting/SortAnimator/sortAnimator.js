import React from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './sortAnimator.css';
import { Canvas } from '../Canvas/canvas'; 
import { Logger } from '../Logger/logger';

export class SortAnimator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibilityDefault: 'none',
            visibilityStepping: 'none',
            newMessage: '',
            showNotification: false,
            notificationMessage: '',
            settings: props.params
        };
        this.canvasCore = React.createRef();
        this.logger = React.createRef();
        this.handleStart = this.handleStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handlePrevStep = this.handlePrevStep.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.doSort = this.doSort.bind(this);
        this.pushMessage = this.pushMessage.bind(this);
        this.stepBackMessage = this.stepBackMessage.bind(this);
        this.alert = this.alert.bind(this);
    }

    alert(message) {
        this.setState({
            showNotification: true,
            notificationMessage: message
        });
        setTimeout(() => this.setState({ showNotification: false, notificationMessage: '' }), 2000);
    }

    doSort() {
        this.setState({
            visibilityDefault: this.props.params.mode === 'default' ? 'inline' : 'none',
            visibilityStepping: this.props.params.mode === 'stepping' ? 'inline' : 'none'
        });
        this.logger.current.clearMessage();
        this.canvasCore.current.start();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                settings: this.props.params
            });
        }
    }

    handleStart(event) {
        this.doSort();
        event.preventDefault();
    }

    handlePause(event) {
        this.canvasCore.current.cancel();
        event.preventDefault();
    }

    handleContinue(event) {
        this.canvasCore.current.continue();
        event.preventDefault();
    }

    handleNextStep(event) {
        this.canvasCore.current.step();
        event.preventDefault();
    }

    handlePrevStep(event) {
        this.canvasCore.current.stepBack();
        event.preventDefault();
    }

    handleFinish() {
        this.setState({
            visibilityDefault: 'none'
        });
    }

    pushMessage(message) {
        if (this.state.settings.logging === 'enabled') {
            this.setState({
                newMessage: message
            });
            this.logger.current.addMessage(message);
        }
    }

    stepBackMessage() {
        if (this.state.settings.logging === 'enabled') {
            this.logger.current.stepBackMessage();
        }
    }

    render() {
        return <div>
            <Modal
                size="md"
                show={this.state.showNotification}
                onHide={() => this.setState({ showNotification: false,  notificationMessage: '' })}
            >
                <Modal.Header closeButton>
                    {this.state.notificationMessage}
                </Modal.Header>
            </Modal>
            <Row>
                <Col md='8'>
                    <Canvas 
                    ref={this.canvasCore}
                    finish={this.handleFinish}
                    params={this.state.settings}
                    pushMessage={this.pushMessage}
                    stepBackMessage={this.stepBackMessage}
                    alert={this.alert}
                    className='Canvas'/> 
                </Col>
                <Col md='4' style={{ visibility: this.state.settings.logging === 'enabled' ? 'visible' : 'hidden' }}>
                    <Logger ref={this.logger} mode={this.state.settings.mode}/>
                </Col>
            </Row>
            <Row>
                <Col md='6'>
                    <Button onClick={this.handleStart}>Start</Button>{'  '}
                    <Button style={{ display: this.state.visibilityDefault }} onClick={this.handlePause}>Pause</Button>{'  '}
                    <Button style={{ display: this.state.visibilityDefault }} onClick={this.handleContinue}>Continue</Button>{'  '}
                    <Button style={{ display: this.state.visibilityStepping }} onClick={this.handleNextStep}>Next Step</Button>{'  '}
                    <Button style={{ display: this.state.visibilityStepping }} onClick={this.handlePrevStep}>Previous Step</Button>
                </Col>
            </Row>
        </div>;
    }
}