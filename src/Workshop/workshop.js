import React from 'react';
import { Row, Col, DropdownButton, Dropdown, Button, Modal, Form, Table } from 'react-bootstrap';
import './workshop.css';
import { CodeEditor } from './Editor/codeEditor';

const typeNameMapping = {
    sort: 'Sorting'
};

export class Workshop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithmType: 'sort',
            algorithmName: '',
            requestedAlgorithmType: '',
            showNotification: false,
            showAlgorithmListDialog: false

        };
        if (!localStorage.getItem('sort')) {
            var sortAlgorithm = [];
            localStorage.setItem('sort', JSON.stringify(sortAlgorithm));
        }
        this.editor = React.createRef();
        this.saveAlgorithm = this.saveAlgorithm.bind(this);
        this.saveCode = this.saveCode.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getAlgorithms = this.getAlgorithms.bind(this);
        this.loadAlgorithm = this.loadAlgorithm.bind(this);
        this.deleteAlgorithm = this.deleteAlgorithm.bind(this);
        this.alert = this.alert.bind(this);
    }

    alert(message) {
        this.setState({
            showNotification: true,
            notificationMessage: message
        });
        setTimeout(() => this.setState({ showNotification: false, notificationMessage: '' }), 2000);
    }

    saveCode() {
        this.editor.current.doSave();
    }

    deleteAlgorithm() {
        if (this.state.algorithmName === '') {
            this.alert('Cannot delete algorithm: algorithm name is missing');
            return;
        }

        var key = 'customAlgo.' + this.state.algorithmType + '.' + this.state.algorithmName;
        var algorithmList = JSON.parse(localStorage.getItem(this.state.algorithmType));
        
        var idx = algorithmList.indexOf(this.state.algorithmName);
        if (idx !== -1) {
            algorithmList.splice(idx, 1);
            localStorage.setItem(this.state.algorithmType, JSON.stringify(algorithmList));
        } else {
            this.alert('Cannot delete algorithm: specified algorithm doesn\'t exist');
            return;
        }

        localStorage.removeItem(key);
        this.alert('Algorithm removed successfully: ' + this.state.algorithmName + ' (' + this.state.algorithmType + ')');
    }

    saveAlgorithm(code) {
        if (this.state.algorithmName === '') {
            this.alert('Cannot create algorithm: algorithm name is missing');
            return;
        }
        
        var key = 'customAlgo.' + this.state.algorithmType + '.' + this.state.algorithmName;
        var algorithmList = JSON.parse(localStorage.getItem(this.state.algorithmType));
        
        if (algorithmList.indexOf(this.state.algorithmName) === -1) {
            algorithmList.push(this.state.algorithmName);
            localStorage.setItem(this.state.algorithmType, JSON.stringify(algorithmList));
        }

        if (localStorage.getItem(key)) {
            localStorage.setItem(key, code);
            this.alert('Algorithm saved successfully: ' + this.state.algorithmName + ' (' + this.state.algorithmType + ')');
        } else {
            localStorage.setItem(key, code);
            this.alert('New algorithm created successfully: ' + this.state.algorithmName + ' (' + this.state.algorithmType + ')');
        }

        // Function(code).bind(this)();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
        if (name === 'algorithmType') {
            this.editor.loadTemplate();
        }
        event.preventDefault();
    }

    getAlgorithms(type) {
        this.setState({
            showAlgorithmListDialog: true,
            requestedAlgorithmType: type
        });
    }

    loadAlgorithm(type, name) {
        var key = 'customAlgo.' + type + '.' + name;
        this.setState({
            algorithmType: type,
            algorithmName: name,       
        });
        this.editor.current.loadCode(localStorage.getItem(key));
    }

    render() {
        var algorithmTable = null;

        if (this.state.showAlgorithmListDialog) {
            var algorithmList = JSON.parse(localStorage.getItem(this.state.requestedAlgorithmType));
            algorithmTable = algorithmList.map((name, index) => {
                return <tr onClick={() => { this.loadAlgorithm(this.state.requestedAlgorithmType, name);
                                            this.setState({ showAlgorithmListDialog: false,  requestedAlgorithmType: '' }); }}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                </tr>
            })
        }

        return <div className='Workshop'>
            <Modal
                size="md"
                show={this.state.showNotification}
                onHide={() => this.setState({ showNotification: false,  notificationMessage: '' })}
            >
                <Modal.Header closeButton>
                    {this.state.notificationMessage}
                </Modal.Header>
            </Modal>
            <Modal
                size="lg"
                show={this.state.showAlgorithmListDialog}
                onHide={() => this.setState({ showAlgorithmListDialog: false,  requestedAlgorithmType: '' })}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {'My ' + typeNameMapping[this.state.requestedAlgorithmType] + ' Algorithms'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Algorithm Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {algorithmTable}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
            <Row>
                    <Form as={Col} md='8' className='AlgorithmInfoFormDisplay'>
                        <DropdownButton className='OpenAlgorithmButton' title="Open Algorithm">
                            <Dropdown.Item as="button" onClick={() => { this.getAlgorithms('sort'); }}>Sorting</Dropdown.Item>
                        </DropdownButton>
                        <Form.Group className='AlgorithmInfoFormDisplay' controlId='algorithmName'>
                            <Form.Label className='AlgorithmInfoFormLabel'>Algorithm Name</Form.Label>
                                <Col>
                                    <Form.Control
                                    required
                                    name='algorithmName'
                                    value={this.state.algorithmName}
                                    onChange={this.handleInputChange}></Form.Control>
                                </Col>
                        </Form.Group>
                        <Form.Group className='AlgorithmInfoFormDisplay' controlId='algorithmType'>
                            <Form.Label className='AlgorithmInfoFormLabel'>Algorithm Type</Form.Label>
                                <Col>
                                    <Form.Control
                                    as='select'
                                    name='algorithmType'
                                    value={this.state.algorithmType}
                                    onChange={this.handleInputChange}>
                                        <option value='sort'>Sorting Algorithm</option>
                                    </Form.Control>
                                </Col>
                        </Form.Group>
                    </Form>
                    <Col md={{ span: 2, offset: 2 }}>
                        <Button onClick={this.saveCode}>Save</Button>
                        <Button className='DeleteButton' onClick={this.deleteAlgorithm}>Delete</Button>
                    </Col>
            </Row>
            <Row>
                <Col md='12' className='CodeEditor'>
                    <CodeEditor ref={this.editor} saveAlgorithm={this.saveAlgorithm}/>
                </Col>
            </Row>
        </div>;
    }
}