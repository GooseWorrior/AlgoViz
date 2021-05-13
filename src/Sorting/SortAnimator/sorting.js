export var SortEngine = (function() {

  var DEFAULT_COLOR = '#777';
  var COMPARE_COLOR = '#00f';
  var SWAP_COLOR = '#f00';

  class AnimatedArray {
    constructor(array, canvas, interval, algorithm, pivot) {
      this.algorithm = getSortFunction(algorithm, pivot);
      this.array = array;
      this.canvas = canvas;
      this.diaplayArray = [];
      this.colors = [];
      this.actions = [];
      this.interval = interval
      for (let i = 0; i < array.length; ++i) {
        this.diaplayArray.push(array[i]);
        this.colors.push(DEFAULT_COLOR);
      }
      this.algorithm(this);
    }
  }

  AnimatedArray.prototype.run = function() {
    draw_array(this.canvas, this.diaplayArray, this.colors);
    var that = this;
    this.routine = window.setInterval(function() {that.step();}, this.interval);
  }

  AnimatedArray.prototype.cancel = function() {
    window.clearInterval(this.routine);
  }

  AnimatedArray.prototype.compare = function(i, j) {
    this.actions.push(['compare', i, j]);
    return this.array[i] - this.array[j];
  }

  AnimatedArray.prototype.lessThan = function(i, j) {
    return this.compare(i, j) < 0;
  }

  AnimatedArray.prototype.swap = function(i, j) {
    this.actions.push(['swap', i, j]);
    var t = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = t;
  }

  AnimatedArray.prototype.step = function() {
    if (this.actions.length === 0) {
      draw_array(this.canvas, this.diaplayArray, this.colors);
      return;
    }
    var action = this.actions.shift();
    var i = action[1];
    var j = action[2];
    if (action[0] === 'compare') {
      this.colors[i] = COMPARE_COLOR;
      this.colors[j] = COMPARE_COLOR;
    } else if (action[0] === 'swap') {
      this.colors[i] = SWAP_COLOR;
      this.colors[j] = SWAP_COLOR;
      var t = this.diaplayArray[i];
      this.diaplayArray[i] = this.diaplayArray[j];
      this.diaplayArray[j] = t;
    }
    draw_array(this.canvas, this.diaplayArray, this.colors);
    this.colors[i] = DEFAULT_COLOR;
    this.colors[j] = DEFAULT_COLOR;
  }

  AnimatedArray.prototype.length = function() {
    return this.array.length;
  }

  /*********************************/
  /* public function */
  /*********************************/

  function is_pivot_algo(algo) {
    var pivot_algos = {
      'quicksort': true,
      'introsort': true,
    };
    return pivot_algos.hasOwnProperty(algo);
  }

  function getSortFunction(algo, pivot_type) {
    if (!algorithms.hasOwnProperty(algo)) {
      throw Error();
    }
    var sort_fn = algorithms[algo];
    if (is_pivot_algo(algo)) {
      return function(aa) { sort_fn(aa, pivot_type); };
    } else {
      return sort_fn;
    }
  }

  /*********************************/
  /* Private function */
  /*********************************/

  function randint(low, high) {
    // Return a random integer in the range [low, high] inclusive.
    return low + Math.floor((high - low + 1) * Math.random());
  }

  function draw_array(canvas, array, colors) {
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

  /*********************************/
  /* Sort algorithm */
  /*********************************/

  var algorithms = {
    'bubblesort': bubblesort,
    'selectionsort': selectionsort,
    'odd_even_sort': odd_even_sort,
    'cocktail_sort': cocktail_sort,
    'insertionsort': insertionsort,
    'heapsort': heapsort,
    'quicksort': quicksort,
    'mergesort': mergesort,
    'introsort': introsort,
    'bitonic_mergesort': bitonic_mergesort,
  }

  function bubblesort(aa) {
    var n = aa.length();
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        if (aa.lessThan(j + 1, j)) {
          aa.swap(j, j + 1);
        }
      }
    }
  }


  function selectionsort(aa) {
    var n = aa.length();
    for (var i = 0; i < n - 1; i++) {
      var min_j = i;
      for (var j = i; j < n; j++) {
        if (aa.lessThan(j, min_j)) min_j = j;
      }
      aa.swap(i, min_j);
    }
  }


  function insertionsort(aa) {
    var n = aa.length();
    for (var i = 1; i < n; i++) {
      for (var j = i; j > 0 && aa.lessThan(j, j - 1); j--) {
        aa.swap(j, j - 1);
      }
    }
  }
  

  function odd_even_sort(aa) {
    var n = aa.length();
    var sorted = false;
    while (!sorted) {
      sorted = true;
      for (var p = 0; p <= 1; p++) {
        for (var i = p; i + 1 < n; i += 2) {
          if (aa.lessThan(i + 1, i)) {
            aa.swap(i + 1, i);
            sorted = false;
          }
        }
      }
    }
  }


  function cocktail_sort(aa) {
    var n = aa.length();
    var left = 0;
    var right = n - 1;
    while (left < right) {
      var new_right = right - 1;
      for (var i = left; i + 1 <= right; i++) {
        if (aa.lessThan(i + 1, i)) {
          aa.swap(i + 1, i);
          new_right = i;
        }
      }
      right = new_right;
      var new_left = left + 1;
      for (let i = right; i - 1 >= left; i--)  {
        if (aa.lessThan(i, i - 1)) {
          aa.swap(i, i - 1);
          new_left = i;
        }
      }
      left = new_left;
    }
  }


  function choose_pivot(aa, pivot_type, left, right) {
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') right = aa.length() - 1;
    var pivot = null;
    if (pivot_type === 'random') {
      pivot = randint(left, right);
    } else if (pivot_type === 'first') {
      pivot = left;
    } else if (pivot_type === 'last') {
      pivot = right;
    } else if (pivot_type === 'middle') {
      pivot = Math.round((left + right) / 2);
    } else if (pivot_type === 'median3') {
      if (left + 1 === right) {
        // special case to avoid needless comparisons for small arrays
        pivot = left;
      } else {
        // Lots of cases to handle:
        // LMR, RML -> M
        // RLM, MLR -> L
        // LRM, MRL -> R
        var middle = Math.round((left + right) / 2);
        var LM = aa.lessThan(left, middle);
        var MR = aa.lessThan(middle, right);
        if (LM === MR) {
          pivot = middle;
        } else if (LM && !MR) {
          pivot = aa.lessThan(left, right) ? right : left;
        } else if (!LM && MR) {
          pivot = aa.lessThan(left, right) ? left : right;
        }
      }
    } else {
      throw Error();
    }
    return pivot;
  }


  function partition(aa, pivot_type, left, right) {
    var pivot = choose_pivot(aa, pivot_type, left, right);
    aa.swap(pivot, right);

    // Partition the array around the pivot.
    pivot = left;
    for (let i = left; i < right; i++) {
      if (aa.lessThan(i, right)) {
        if (i !== pivot) {
          aa.swap(i, pivot);
        }
        pivot += 1
      }
    }
    aa.swap(right, pivot);

    return pivot;
  }


  function quicksort(aa, pivot_type, left, right) {
    var n = aa.length();
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') right = n - 1;

    if (left >= right) return;

    var pivot = partition(aa, pivot_type, left, right);
    quicksort(aa, pivot_type, left, pivot - 1);
    quicksort(aa, pivot_type, pivot + 1, right);
  }


  function check_perm(perm) {
    // Check to see if an array is a valid permutation.
    var n = perm.length;
    var used = {};
    for (var i = 0; i < n; i++) {
      if (used[perm[i]]) return false;
      used[perm[i]] = true;
    }
    for (let i = 0; i < n; i++) if (!used[i]) return false;
    return true;
  }


  function perm_to_swaps(perm) {
    /*
     *  Convert a permutation to a sequence of transpositions.
     *  
     *  We represent a general permutation as a list of length N
     *  where each element is an integer from 0 to N - 1, with the
     *  interpretation that the element at index i will move to index
     *  perm[i].
     *
     *  In general any permutation can be written as a product of
     *  transpositions; we represent the transpostions as an array t of
     *  length-2 arrays, with the interpretation that we first swap
     *  t[0][0] with t[0][1], then swap t[1][0] with t[1][1], etc.
     *
     *  Input: perm, a permutation
     *  Returns: transpositions: a list of transpositions.
     */
    if (!check_perm(perm)) {
      console.log(perm);
      throw Error();
    }
    var n = perm.length;
    var used = [];
    for (var i = 0; i < n; i++) used.push(false);
    var transpositions = [];

    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      var cur = i;
      if (perm[i] === i) used[i] = true;
      while (!used[perm[cur]]) {
        transpositions.push([cur, perm[cur]]);
        used[cur] = true;
        cur = perm[cur];
      }
    }

    return transpositions;
  }


  function mergesort(aa, left, right) {
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') right = aa.length() - 1;

    if (left >= right) return;
    
    var mid = Math.floor((left + right) / 2);

    if (right - left > 1) {
      mergesort(aa, left, mid);
      mergesort(aa, mid + 1, right);
    }

    // Merge, building up a permutation. This could probably be prettier.
    var next_left = left;
    var next_right = mid + 1;
    var perm = [];
    for (var i = left; i <= right; i++) {
      var choice = null;
      if (next_left <= mid && next_right <= right) {
        if (aa.lessThan(next_left, next_right)) {
          choice = 'L';
        } else {
          choice = 'R';
        }
      } else if (next_left > mid) {
        choice = 'R';
      } else if (next_right > right) {
        choice = 'L';
      }
      if (choice === 'L') {
        perm.push(next_left - left);
        next_left++;
      } else if (choice === 'R') {
        perm.push(next_right - left);
        next_right++;
      } else {
        throw Error();
      }
    }

    var swaps = perm_to_swaps(perm);
    for (let i = 0; i < swaps.length; i++) {
      aa.swap(swaps[i][0] + left, swaps[i][1] + left);
    }
  }

  function heapsort(aa, left, right) {
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') right = aa.length() - 1;
    var n = right - left + 1;

    function sift_down(start, end) {
      var root = start;
      while (true) {
        var left_child = 2 * (root - left) + 1 + left;
        var right_child = 2 * (root - left) + 2 + left;
        if (left_child > end) break;

        var swap = root;
        if (aa.lessThan(swap, left_child)) {
          swap = left_child;
        }
        if (right_child <= end && aa.lessThan(swap, right_child)) {
          swap = right_child;
        }
        if (swap === root) {
          return;
        }
        aa.swap(root, swap);
        root = swap;
      }
    }

    // First build a heap
    var start = Math.floor(n / 2) - 1 + left;
    while (start >= left) {
      sift_down(start, right);
      start--;
    }

    // Now pop elements one by one, rebuilding the heap after each
    var end = right;
    while (end > left) {
      aa.swap(end, left);
      end--;
      sift_down(left, end);
    }
  } 

  function introsort(aa, pivot_type, left, right, maxdepth) {
    if (typeof(left) === 'undefined') left = 0;
    if (typeof(right) === 'undefined') right = aa.length() - 1;

    var n = right - left + 1;
    if (typeof(maxdepth) === 'undefined') {
      maxdepth = 2 * Math.floor(Math.log(n) / Math.log(2));
    }

    if (n <= 1) return;
    if (maxdepth === 0) {
      heapsort(aa, left, right);
    } else {
      var pivot = partition(aa, pivot_type, left, right);
      introsort(aa, pivot_type, left, pivot, maxdepth - 1);
      introsort(aa, pivot_type, pivot + 1, right, maxdepth - 1);
    }
  }


  function bitonic_merge(aa, up, left, right) {
    var n = right - left + 1;
    var step = Math.floor(n / 2);
    while (step > 0) {
      for (var i = 0; i < n; i += step * 2) {
        var k = 0;
        for (var j = i; k < step; j++) {
          var cmp = aa.compare(left + j, left + j + step);
          if ((up && cmp > 0) || (!up && cmp < 0)) {
            aa.swap(left + j, left + j + step);
          }
          k++;
        }
      }
      step = Math.floor(step / 2);
    }
  }


  function bitonic_mergesort(aa) {
    var n = aa.length();
    var n2 = 1;
    while (n2 < n) n2 *= 2;
    if (n !== n2) throw Error();
    for (var s = 2; s <= n2; s *= 2) {
      for (var i = 0; i < n;) {
        bitonic_merge(aa, true, i, i + s - 1);
        bitonic_merge(aa, false, i + s, i + 2 * s - 1);
        i += s * 2;
      }
    }
  }
  
  return {
    'AnimatedArray': AnimatedArray,
    'getSortFunction': getSortFunction,
    'is_pivot_algo': is_pivot_algo,
    'algorithms': algorithms,
  }
})();
