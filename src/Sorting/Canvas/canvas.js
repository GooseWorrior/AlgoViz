import React from 'react';
import { algorithms } from '../Algorithms/algorithm.js';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.DEFAULT_COLOR = '#777';
        this.COMPARE_COLOR = '#00f';
        this.SWAP_COLOR = '#f00';
        this.ASSIGN_COLOR = '#0f0';

        this.canvasRef = React.createRef();
        
        this.animatorState = false;

        this.start = this.start.bind(this);
        this.initialize = this.initialize.bind(this);
        this.run = this.run.bind(this);
        this.cancel = this.cancel.bind(this);
        this.compare = this.compare.bind(this);
        this.lessThan = this.lessThan.bind(this);
        this.greaterThan = this.greaterThan.bind(this);
        this.lessEqual = this.lessEqual.bind(this);
        this.greaterEqual = this.greaterEqual.bind(this);
        this.equal = this.equal.bind(this);
        this.assign = this.assign.bind(this);
        this.swap = this.swap.bind(this);
        this.step = this.step.bind(this);
        this.length = this.length.bind(this);
        this.is_pivot_algo = this.is_pivot_algo.bind(this);
        this.getSortFunction = this.getSortFunction.bind(this);
        this.draw_array = this.draw_array.bind(this);
    }
    
    componentDidMount() {
        if (!this.canvas) {
            this.canvas = this.canvasRef.current;
            var context = this.canvas.getContext('2d');
            context.fillStyle = '#fff';
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    start() {
        if (this.animatorState) {
            this.cancel();
        }
        this.initialize();
        if (this.props.params.mode === 'default') {
            this.run();
        }
    }

    initialize() {
        console.log(this.props);
        var n = this.props.params.arraySize;
        if (this.props.params.algorithm === 'bitonic_mergesort') {
            // Round up to the nearest power of 2
            var n2 = 1;
            while (n2 < n) n2 *= 2;
            n = n2;
        }

        var array = [];
        for (var i = 0; i < n; i++) {
          array.push(Math.random() - 0.5);
        }
        var init = this.props.params.specialInput;
        if (init === 'sorted') {
            array.sort(function(a, b) { return a - b; });
        } else if (init === 'reversed') {
            array.sort(function(a, b) { return b - a; });
        }

        this.array = array;
        this.displayArray = [];
        this.colors = [];
        this.actions = [];
        this.actionsPointer = 0;
        this.interval = this.props.params.operationInterval;
        for (let i = 0; i < this.array.length; ++i) {
            this.displayArray.push(this.array[i]);
            this.colors.push(this.DEFAULT_COLOR);
        }

        try {
            this.algorithm = this.getSortFunction(this.props.params.algorithm, this.props.params.pivot);
            this.algorithm(this);
        } catch (error) {
            this.props.alert(error.name + ": " + error.message);
        }
        this.draw_array(this.canvas, this.displayArray, this.colors);
    }

    run() {
        var that = this;
        this.animatorState = true;
        this.routine = window.setInterval(function() {that.step();}, this.interval);
    }
    
    continue() {
        var that = this;
        if (!this.routine) {
            this.routine = window.setInterval(function() {that.step();}, this.interval)
        }
    }

    cancel() {
        window.clearInterval(this.routine);
        this.routine = null;
    }
    
    compare(i, j) {
        this.actions.push(['compare', i, j]);
        return this.array[i] - this.array[j];
    }
    
    lessThan(i, j) {
        return this.compare(i, j) < 0;
    }

    greaterThan(i, j) {
        return this.compare(i, j) > 0;
    }

    lessEqual(i, j) {
        return this.compare(i, j) <= 0;
    }

    greaterEqual(i, j) {
        return this.compare(i, j) >= 0;
    }

    equal(i, j) {
        return this.compare(i, j) === 0;
    }

    assign(i, n) {
        this.actions.push(['assign', i, n]);
        this.array[i] = n;
    }

    swap(i, j) {
        this.actions.push(['swap', i, j]);
        var t = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = t;
    }
    
    step() {
        if (this.actionsPointer === this.actions.length) {
          this.draw_array(this.canvas, this.displayArray, this.colors);
          if (this.props.params.mode === 'default') {
            this.animatorState = false;
            this.cancel();
          }
          this.props.finish();
          return;
        }
        var action = this.actions[this.actionsPointer];
        var i = action[1];
        var j = action[2];
        if (action[0] === 'compare') {
          this.colors[i] = this.COMPARE_COLOR;
          this.colors[j] = this.COMPARE_COLOR;
        } else if (action[0] === 'swap') {
          this.colors[i] = this.SWAP_COLOR;
          this.colors[j] = this.SWAP_COLOR;
          var t = this.displayArray[i];
          this.displayArray[i] = this.displayArray[j];
          this.displayArray[j] = t;
        } else if (action[0] === 'assign') {
          this.colors[i] = this.ASSIGN_COLOR;
          this.actions[this.actionsPointer][2] = this.displayArray[i];
          this.displayArray[i] = j;
        }
        this.draw_array(this.canvas, this.displayArray, this.colors);
        this.colors[i] = this.DEFAULT_COLOR;
        this.colors[j] = this.DEFAULT_COLOR;
        this.props.pushMessage([this.actionsPointer, ...action,
            (action[0] === 'compare' ? 
            this.displayArray[action[1]] < this.displayArray[action[2]] ? '<' :
            this.displayArray[action[1]] === this.displayArray[action[2]] ? '=' : '>' : null)]);
        this.actionsPointer++;
    }

    stepBack() {
        if (this.actionsPointer > 0) {
            this.actionsPointer--;
        }
        if (this.actionsPointer === 0) {
          this.draw_array(this.canvas, this.displayArray, this.colors);
          this.props.stepBackMessage()
          return;
        }
        var actionUndo = this.actions[this.actionsPointer];
        var action = this.actions[this.actionsPointer - 1];
        var i = action[1];
        var j = action[2];
        var k = actionUndo[1];
        var l = actionUndo[2];
        if (actionUndo[0] === 'swap') {
            var t = this.displayArray[k];
            this.displayArray[k] = this.displayArray[l];
            this.displayArray[l] = t;
        } else if (actionUndo[0] === 'assign') {
            this.actions[this.actionsPointer][2] = this.displayArray[k];
            this.displayArray[k] = l;
        }

        if (action[0] === 'compare') {
          this.colors[i] = this.COMPARE_COLOR;
          this.colors[j] = this.COMPARE_COLOR;
        } else if (action[0] === 'swap') {
          this.colors[i] = this.SWAP_COLOR;
          this.colors[j] = this.SWAP_COLOR;
        } else if (action[0] === 'assign') {
            this.colors[i] = this.ASSIGN_COLOR;
        }
        this.draw_array(this.canvas, this.displayArray, this.colors);
        this.colors[i] = this.DEFAULT_COLOR;
        this.colors[j] = this.DEFAULT_COLOR;
        this.props.stepBackMessage();
    }
    
    length() {
        return this.array.length;
    }

    is_pivot_algo(algo) {
        var pivot_algos = {
        'quicksort': true,
        'introsort': true,
        };
        return pivot_algos.hasOwnProperty(algo);
    }

    getSortFunction(algo, pivotType) {
        if (algo === 'custom_algorithm') {
            console.log(this.props.params.customAlgorithm);
            console.log(localStorage.getItem(this.props.params.customAlgorithm));
            var key = 'customAlgo.sort.' + this.props.params.customAlgorithm;
            // eslint-disable-next-line
            var module = (Function(localStorage.getItem(key) + '\n return \{ \'sort\': sort \};'))();
            if (!module.sort) {
                throw Error('Custom algorithm should contain a function named sort()');
            }
            return function(aa) { module.sort(aa); };
        } else {
            if (!algorithms.hasOwnProperty(algo)) {
                throw Error('Invalid algorithm');
            }
            var sortFunction = algorithms[algo];
            if (this.is_pivot_algo(algo)) {
                return function(aa) { sortFunction(aa, pivotType); };
            } else {
                return sortFunction;
            }
        }
    }

    draw_array(canvas, array, colors) {
    /*
     * Draw an array on a canvas.
     *
     * Inputs:
     * - canvas: a DOM canvas object
     * - ary: An array of numbers to draw
     * - colors: An array of the same length as ary, whose ith element
     *   is a string giving the color for the ith element of ary
     */
        var width_ratio = 2;
        var ctx = canvas.getContext('2d');

    // Clear the canvas
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Find min and max elements
        var min = array[0];
        var max = array[0];
        for (let i = 1; i < array.length; i++) {
            min = array[i] < min ? array[i] : min;
            max = array[i] > max ? array[i] : max;
        }

    // Figure out width of bars and spacing
        var n = array.length;
        var spacing = canvas.width / (width_ratio * n + n + 1);
        var bar_width = spacing * width_ratio;

    // Draw a box around the outside of the canvas
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        function convert_y(y) {
        // Want convert_y(max) = 0, convert_y(min) = canvas.height`
        var a = canvas.height / (min - max);
        var b = max * canvas.height / (max - min);
            return a * y + b;
        }

    // Draw a baseline for zero
        var y_zero = convert_y(0);
        ctx.beginPath();
        ctx.moveTo(0, y_zero);
        ctx.lineTo(canvas.width, y_zero);
        ctx.stroke();

    // Now draw boxes
        var x = spacing;
        for (let i = 0; i < array.length; i++) {
            ctx.fillStyle = colors[i];
            var y = convert_y(array[i]);
            if (array[i] >= 0) {
                ctx.fillRect(x, y, bar_width, y_zero - y);
            } else {
                ctx.fillRect(x, y_zero, bar_width, y - y_zero);
            }
            x += spacing + bar_width;
        }
    }

    render() {
        return <canvas ref={this.canvasRef} className="Canvas"/>;
    }
}