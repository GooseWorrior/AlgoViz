import { Button, Form, Row, Tabs, Tab, Col } from 'react-bootstrap';
import React from 'react';
import { SortAnimator } from './SortAnimator/sortAnimator'
import './sortingAlgorithm.css'

export class SortingAlgorithm extends React.Component {
  constructor(props) {
    super(props);
    this.sortAnimator = React.createRef();
    this.state = {
      settings: {
        arraySize: 50,
        algorithm: 'bubblesort',
        customAlgorithm: '',
        specialInput: 'random',
        operationInterval: 5,
        mode: 'default',
        logging: 'disabled'
      },
      curTab: 'setting',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        [name]: value
      }
    }));
    event.preventDefault();
  }

  setKey(key) {
    this.setState({
      curTab: key
    });
  }

  handleSubmit(event) {
    this.setKey('animator');
    this.sortAnimator.current.doSort();
    event.preventDefault();
  }

  componentDidMount() {
    var customAlgorithmList = JSON.parse(localStorage.getItem('sort'));
    if (customAlgorithmList.length > 0) {
      this.setState(prevState => ({
        settings: {
          ...prevState.settings,
          customAlgorithm: customAlgorithmList[0]
        }
      }));
    }
  }

  render() {
      const customAlgorithmList = JSON.parse(localStorage.getItem('sort')).map(name => {
        return <option value={name}>{name}</option>
      });

      return <Tabs defaultActiveKey='setting' activeKey={this.state.curTab} onSelect={(k) => this.setKey(k)} className='SortingAlgorithmContainer'>
      <Tab className='SortingAlgorithmTab' eventKey='setting' title='Setting'>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId='arraySize'>
          <Form.Label column md='2' >Array Size</Form.Label>
          <Col md='3'>
            <Form.Control
              required
              type='number'
              name='arraySize'
              value={this.state.settings.arraySize}
              onChange={this.handleInputChange}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='algorithm'>
          <Form.Label column md='2'>Algorithm</Form.Label>
          <Col md='3'>
            <Form.Control
              as='Select'
              name='algorithm'
              value={this.state.settings.algorithm}
              onChange={this.handleInputChange}>
              <option value='bubblesort'>Bubble sort</option>
              <option value='selectionsort'>Selection sort</option>
              <option value='insertionsort'>Insertion sort</option>
              <option value='odd_even_sort'>Odd-even sort</option>
              <option value='cocktail_sort'>Cocktail sort</option>
              <option value='quicksort'>Quicksort</option>
              <option value='heapsort'>Heapsort</option>
              <option value='mergesort'>Merge sort</option>
              <option value='bitonic_mergesort'>Bitonic mergesort</option>
              <option value='introsort'>Introsort</option>
              <option value='custom_algorithm'>Custom algorithm</option>
           </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={{ display: this.state.settings.algorithm === 'custom_algorithm' ? 'flex' : 'none' }} controlId='customAlgorithm'>
          <Form.Label column md='2'>Custom Algorithm</Form.Label>
          <Col md='3'>
            <Form.Control
              as='Select'
              name='customAlgorithm'
              value={this.state.settings.customAlgorithm}
              onChange={this.handleInputChange}>
              {customAlgorithmList}
           </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='specialInput'>
          <Form.Label column md='2' >Special Input</Form.Label>
          <Col md='3'>
            <Form.Control
              as='Select'
              name='specialInput'
              value={this.state.settings.specialInput}
              onChange={this.handleInputChange}>
              <option value='random'>None (Random)</option>
              <option value='sorted'>Sorted</option>
              <option value='reversed'>Reversed</option>          
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='operationInterval'>
          <Form.Label column md='2'>Operation Intervals (ms)</Form.Label>
          <Col md='3'>
            <Form.Control
            required
            type="number"
            name='operationInterval'
            value={this.state.settings.operationInterval}
            onChange={this.handleInputChange}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='mode'>
          <Form.Label column md='2'>Mode</Form.Label>
          <Col md='3'>
            <Form.Control
              as='Select'
              name='mode'
              value={this.state.settings.mode}
              onChange={this.handleInputChange}>
              <option value='default'>Default</option>
              <option value='stepping'>Stepping</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='logging'>
          <Form.Label column md='2'>Step Logging</Form.Label>
          <Col md='3'>
            <Form.Control
              as='Select'
              name='logging'
              value={this.state.settings.logging}
              onChange={this.handleInputChange}>
              <option value='disabled'>Disabled</option>
              <option value='enabled'>Enabled</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='startButton'>
          <Col md={{ span: 1, offset: 11 }}>
            <Button className='startButton' variant="primary" type="submit">
              Start
            </Button>
          </Col>
        </Form.Group>
        </Form>
      </Tab>
      <Tab className='SortingAlgorithmTab' eventKey='animator' title='Animator'>
        <SortAnimator params={this.state.settings} ref={this.sortAnimator}/>
      </Tab>
      <Tab className='SortingAlgorithmTab' eventKey='logs' title='Logs' disabled></Tab>
    </Tabs>;
    }
}