(this["webpackJsonpalgo-viz"]=this["webpackJsonpalgo-viz"]||[]).push([[0],{84:function(t,e,a){},85:function(t,e,a){},87:function(t,e,a){},90:function(t,e,a){},92:function(t,e,a){},93:function(t,e,a){},96:function(t,e,a){},97:function(t,e,a){"use strict";a.r(e);var s=a(0),i=a.n(s),n=a(26),r=a.n(n),o=(a(84),a(76)),l=a(10),c=a(34),h=a(22),u=a(16),d=a(17),g=a(7),p=a(20),j=a(18),m=a(109),b=a(103),f=a(107),v=a(102),O=a(74),y=a(30),x=a(106),S=(a(85),a(60)),A={bubblesort:function(t){for(var e=t.length(),a=0;a<e;a++)for(var s=0;s<e-a-1;s++)t.lessThan(s+1,s)&&t.swap(s,s+1)},selectionsort:function(t){for(var e=t.length(),a=0;a<e-1;a++){for(var s=a,i=a;i<e;i++)t.lessThan(i,s)&&(s=i);t.swap(a,s)}},odd_even_sort:function(t){var e=t.length(),a=!1;for(;!a;){a=!0;for(var s=0;s<=1;s++)for(var i=s;i+1<e;i+=2)t.lessThan(i+1,i)&&(t.swap(i+1,i),a=!1)}},cocktail_sort:function(t){var e=t.length(),a=0,s=e-1;for(;a<s;){for(var i=s-1,n=a;n+1<=s;n++)t.lessThan(n+1,n)&&(t.swap(n+1,n),i=n);for(var r=a+1,o=s=i;o-1>=a;o--)t.lessThan(o,o-1)&&(t.swap(o,o-1),r=o);a=r}},insertionsort:function(t){for(var e=t.length(),a=1;a<e;a++)for(var s=a;s>0&&t.lessThan(s,s-1);s--)t.swap(s,s-1)},heapsort:w,quicksort:function t(e,a,s,i){var n=e.length();"undefined"===typeof s&&(s=0);"undefined"===typeof i&&(i=n-1);if(s>=i)return;var r=k(e,a,s,i);t(e,a,s,r-1),t(e,a,r+1,i)},mergesort:function t(e,a,s){"undefined"===typeof a&&(a=0);"undefined"===typeof s&&(s=e.length()-1);if(a>=s)return;var i=Math.floor((a+s)/2);s-a>1&&(t(e,a,i),t(e,i+1,s));for(var n=a,r=i+1,o=[],l=a;l<=s;l++){var c=null;n<=i&&r<=s?c=e.lessThan(n,r)?"L":"R":n>i?c="R":r>s&&(c="L"),"L"===c?(o.push(n-a),n++):(o.push(r-a),r++)}for(var h=function(t){if(!function(t){for(var e=t.length,a={},s=0;s<e;s++){if(a[t[s]])return!1;a[t[s]]=!0}for(var i=0;i<e;i++)if(!a[i])return!1;return!0}(t))throw console.log(t),Error("Invalid permutation");for(var e=t.length,a=[],s=0;s<e;s++)a.push(!1);for(var i=[],n=0;n<e;n++)if(!a[n]){var r=n;for(t[n]===n&&(a[n]=!0);!a[t[r]];)i.push([r,t[r]]),a[r]=!0,r=t[r]}return i}(o),u=0;u<h.length;u++)e.swap(h[u][0]+a,h[u][1]+a)},introsort:function t(e,a,s,i,n){"undefined"===typeof s&&(s=0);"undefined"===typeof i&&(i=e.length()-1);var r=i-s+1;"undefined"===typeof n&&(n=2*Math.floor(Math.log(r)/Math.log(2)));if(r<=1)return;if(0===n)w(e,s,i);else{var o=k(e,a,s,i);t(e,a,s,o,n-1),t(e,a,o+1,i,n-1)}},bitonic_mergesort:function(t){var e=t.length(),a=1;for(;a<e;)a*=2;if(e!==a)throw Error("Bitonic sort must use a power of 2");for(var s=2;s<=a;s*=2)for(var i=0;i<e;)I(t,!0,i,i+s-1),I(t,!1,i+s,i+2*s-1),i+=2*s}};function C(t,e,a,s){"undefined"===typeof a&&(a=0),"undefined"===typeof s&&(s=t.length()-1);var i,n,r=null;if("random"===e)n=s,r=(i=a)+Math.floor((n-i+1)*Math.random());else if("first"===e)r=a;else if("last"===e)r=s;else if("middle"===e)r=Math.round((a+s)/2);else{if("median3"!==e)throw Error("Invalid pivot type");if(a+1===s)r=a;else{var o=Math.round((a+s)/2),l=t.lessThan(a,o),c=t.lessThan(o,s);l===c?r=o:l&&!c?r=t.lessThan(a,s)?s:a:!l&&c&&(r=t.lessThan(a,s)?a:s)}}return r}function k(t,e,a,s){var i=C(t,e,a,s);t.swap(i,s),i=a;for(var n=a;n<s;n++)t.lessThan(n,s)&&(n!==i&&t.swap(n,i),i+=1);return t.swap(s,i),i}function w(t,e,a){"undefined"===typeof e&&(e=0),"undefined"===typeof a&&(a=t.length()-1);var s=a-e+1;function i(a,s){for(var i=a;;){var n=2*(i-e)+1+e,r=2*(i-e)+2+e;if(n>s)break;var o=i;if(t.lessThan(o,n)&&(o=n),r<=s&&t.lessThan(o,r)&&(o=r),o===i)return;t.swap(i,o),i=o}}for(var n=Math.floor(s/2)-1+e;n>=e;)i(n,a),n--;for(var r=a;r>e;)t.swap(r,e),r--,i(e,r)}function I(t,e,a,s){for(var i=s-a+1,n=Math.floor(i/2);n>0;){for(var r=0;r<i;r+=2*n)for(var o=0,l=r;o<n;l++){var c=t.compare(a+l,a+l+n);(e&&c>0||!e&&c<0)&&t.swap(a+l,a+l+n),o++}n=Math.floor(n/2)}}var N=a(1),T=function(t){Object(p.a)(a,t);var e=Object(j.a)(a);function a(t){var s;return Object(u.a)(this,a),(s=e.call(this,t)).DEFAULT_COLOR="#777",s.COMPARE_COLOR="#00f",s.SWAP_COLOR="#f00",s.ASSIGN_COLOR="#0f0",s.canvasRef=i.a.createRef(),s.animatorState=!1,s.start=s.start.bind(Object(g.a)(s)),s.initialize=s.initialize.bind(Object(g.a)(s)),s.run=s.run.bind(Object(g.a)(s)),s.cancel=s.cancel.bind(Object(g.a)(s)),s.compare=s.compare.bind(Object(g.a)(s)),s.lessThan=s.lessThan.bind(Object(g.a)(s)),s.greaterThan=s.greaterThan.bind(Object(g.a)(s)),s.lessEqual=s.lessEqual.bind(Object(g.a)(s)),s.greaterEqual=s.greaterEqual.bind(Object(g.a)(s)),s.equal=s.equal.bind(Object(g.a)(s)),s.assign=s.assign.bind(Object(g.a)(s)),s.swap=s.swap.bind(Object(g.a)(s)),s.step=s.step.bind(Object(g.a)(s)),s.length=s.length.bind(Object(g.a)(s)),s.is_pivot_algo=s.is_pivot_algo.bind(Object(g.a)(s)),s.getSortFunction=s.getSortFunction.bind(Object(g.a)(s)),s.draw_array=s.draw_array.bind(Object(g.a)(s)),s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){if(!this.canvas){this.canvas=this.canvasRef.current;var t=this.canvas.getContext("2d");t.fillStyle="#fff",t.fillRect(0,0,this.canvas.width,this.canvas.height),t.strokeRect(0,0,this.canvas.width,this.canvas.height)}}},{key:"start",value:function(){this.animatorState&&this.cancel(),this.initialize(),"default"===this.props.params.mode&&this.run()}},{key:"initialize",value:function(){console.log(this.props);var t=this.props.params.arraySize;if("bitonic_mergesort"===this.props.params.algorithm){for(var e=1;e<t;)e*=2;t=e}for(var a=[],s=0;s<t;s++)a.push(Math.random()-.5);var i=this.props.params.specialInput;"sorted"===i?a.sort((function(t,e){return t-e})):"reversed"===i&&a.sort((function(t,e){return e-t})),this.array=a,this.displayArray=[],this.colors=[],this.actions=[],this.actionsPointer=0,this.interval=this.props.params.operationInterval;for(var n=0;n<this.array.length;++n)this.displayArray.push(this.array[n]),this.colors.push(this.DEFAULT_COLOR);try{this.algorithm=this.getSortFunction(this.props.params.algorithm,this.props.params.pivot),this.algorithm(this)}catch(r){this.props.alert(r.name+": "+r.message)}this.draw_array(this.canvas,this.displayArray,this.colors)}},{key:"run",value:function(){var t=this;this.animatorState=!0,this.routine=window.setInterval((function(){t.step()}),this.interval)}},{key:"continue",value:function(){var t=this;this.routine||(this.routine=window.setInterval((function(){t.step()}),this.interval))}},{key:"cancel",value:function(){window.clearInterval(this.routine),this.routine=null}},{key:"compare",value:function(t,e){return this.actions.push(["compare",t,e]),this.array[t]-this.array[e]}},{key:"lessThan",value:function(t,e){return this.compare(t,e)<0}},{key:"greaterThan",value:function(t,e){return this.compare(t,e)>0}},{key:"lessEqual",value:function(t,e){return this.compare(t,e)<=0}},{key:"greaterEqual",value:function(t,e){return this.compare(t,e)>=0}},{key:"equal",value:function(t,e){return 0===this.compare(t,e)}},{key:"assign",value:function(t,e){this.actions.push(["assign",t,e]),this.array[t]=e}},{key:"swap",value:function(t,e){this.actions.push(["swap",t,e]);var a=this.array[t];this.array[t]=this.array[e],this.array[e]=a}},{key:"step",value:function(){if(this.actionsPointer===this.actions.length)return this.draw_array(this.canvas,this.displayArray,this.colors),"default"===this.props.params.mode&&(this.animatorState=!1,this.cancel()),void this.props.finish();var t=this.actions[this.actionsPointer],e=t[1],a=t[2];if("compare"===t[0])this.colors[e]=this.COMPARE_COLOR,this.colors[a]=this.COMPARE_COLOR;else if("swap"===t[0]){this.colors[e]=this.SWAP_COLOR,this.colors[a]=this.SWAP_COLOR;var s=this.displayArray[e];this.displayArray[e]=this.displayArray[a],this.displayArray[a]=s}else"assign"===t[0]&&(this.colors[e]=this.ASSIGN_COLOR,this.actions[this.actionsPointer][2]=this.displayArray[e],this.displayArray[e]=a);this.draw_array(this.canvas,this.displayArray,this.colors),this.colors[e]=this.DEFAULT_COLOR,this.colors[a]=this.DEFAULT_COLOR,this.props.pushMessage([this.actionsPointer].concat(Object(S.a)(t),["compare"===t[0]?this.displayArray[t[1]]<this.displayArray[t[2]]?"<":this.displayArray[t[1]]===this.displayArray[t[2]]?"=":">":null])),this.actionsPointer++}},{key:"stepBack",value:function(){if(this.actionsPointer>0&&this.actionsPointer--,0===this.actionsPointer)return this.draw_array(this.canvas,this.displayArray,this.colors),void this.props.stepBackMessage();var t=this.actions[this.actionsPointer],e=this.actions[this.actionsPointer-1],a=e[1],s=e[2],i=t[1],n=t[2];if("swap"===t[0]){var r=this.displayArray[i];this.displayArray[i]=this.displayArray[n],this.displayArray[n]=r}else"assign"===t[0]&&(this.actions[this.actionsPointer][2]=this.displayArray[i],this.displayArray[i]=n);"compare"===e[0]?(this.colors[a]=this.COMPARE_COLOR,this.colors[s]=this.COMPARE_COLOR):"swap"===e[0]?(this.colors[a]=this.SWAP_COLOR,this.colors[s]=this.SWAP_COLOR):"assign"===e[0]&&(this.colors[a]=this.ASSIGN_COLOR),this.draw_array(this.canvas,this.displayArray,this.colors),this.colors[a]=this.DEFAULT_COLOR,this.colors[s]=this.DEFAULT_COLOR,this.props.stepBackMessage()}},{key:"length",value:function(){return this.array.length}},{key:"is_pivot_algo",value:function(t){return{quicksort:!0,introsort:!0}.hasOwnProperty(t)}},{key:"getSortFunction",value:function(t,e){if("custom_algorithm"===t){console.log(this.props.params.customAlgorithm),console.log(localStorage.getItem(this.props.params.customAlgorithm));var a="customAlgo.sort."+this.props.params.customAlgorithm,s=Function(localStorage.getItem(a)+"\n return { 'sort': sort };")();if(!s.sort)throw Error("Custom algorithm should contain a function named sort()");return function(t){s.sort(t)}}if(!A.hasOwnProperty(t))throw Error("Invalid algorithm");var i=A[t];return this.is_pivot_algo(t)?function(t){i(t,e)}:i}},{key:"draw_array",value:function(t,e,a){var s=t.getContext("2d");s.fillStyle="#fff",s.fillRect(0,0,t.width,t.height);for(var i=e[0],n=e[0],r=1;r<e.length;r++)i=e[r]<i?e[r]:i,n=e[r]>n?e[r]:n;var o=e.length,l=t.width/(2*o+o+1),c=2*l;function h(e){return t.height/(i-n)*e+n*t.height/(n-i)}s.strokeRect(0,0,t.width,t.height);var u=h(0);s.beginPath(),s.moveTo(0,u),s.lineTo(t.width,u),s.stroke();for(var d=l,g=0;g<e.length;g++){s.fillStyle=a[g];var p=h(e[g]);e[g]>=0?s.fillRect(d,p,c,u-p):s.fillRect(d,u,c,p-u),d+=l+c}}},{key:"render",value:function(){return Object(N.jsx)("canvas",{ref:this.canvasRef,className:"Canvas"})}}]),a}(i.a.Component),M=(a(87),function(t){Object(p.a)(a,t);var e=Object(j.a)(a);function a(t){var s;return Object(u.a)(this,a),(s=e.call(this,t)).state={content:[],curStep:-1},s.addMessage=s.addMessage.bind(Object(g.a)(s)),s.clearMessage=s.clearMessage.bind(Object(g.a)(s)),s.stepBackMessage=s.stepBackMessage.bind(Object(g.a)(s)),s}return Object(d.a)(a,[{key:"addMessage",value:function(t){t[0]<this.state.content.length?this.setState((function(e){return{curStep:t[0]}})):this.setState((function(e){return{content:[].concat(Object(S.a)(e.content),[t]),curStep:t[0]}}))}},{key:"stepBackMessage",value:function(){console.log(this.state),this.state.curStep>-1&&this.setState((function(t){return{curStep:t.curStep-1}}))}},{key:"clearMessage",value:function(){this.setState({content:[],curStep:-1})}},{key:"componentDidUpdate",value:function(){console.log("update"+this.state.curStep),document.getElementById("loggerScroll").scrollTop=Math.max(0,(this.state.curStep-13)*Math.floor(500/21))}},{key:"render",value:function(){var t=this,e=this.state.content.map((function(e){return Object(N.jsx)("li",{style:{color:e[0]===t.state.curStep&&"stepping"===t.props.mode?"red":"white"},children:Object(N.jsx)("span",{children:e[1]+" Array["+e[2]+"], Array["+e[3]+"] "+("compare"===e[1]?"(Array["+e[2]+"] "+e[4]+" Array["+e[3]+"])":"")})})}));return Object(N.jsxs)("div",{children:[Object(N.jsx)("div",{children:"Steps: "}),Object(N.jsx)("div",{className:"Logger",id:"loggerScroll",children:Object(N.jsx)("ol",{children:e})})]})}}]),a}(i.a.Component)),L=function(t){Object(p.a)(a,t);var e=Object(j.a)(a);function a(t){var s;return Object(u.a)(this,a),(s=e.call(this,t)).state={visibilityDefault:"none",visibilityStepping:"none",newMessage:"",showNotification:!1,notificationMessage:"",settings:t.params},s.canvasCore=i.a.createRef(),s.logger=i.a.createRef(),s.handleStart=s.handleStart.bind(Object(g.a)(s)),s.handlePause=s.handlePause.bind(Object(g.a)(s)),s.handleContinue=s.handleContinue.bind(Object(g.a)(s)),s.handleStart=s.handleStart.bind(Object(g.a)(s)),s.handleNextStep=s.handleNextStep.bind(Object(g.a)(s)),s.handlePrevStep=s.handlePrevStep.bind(Object(g.a)(s)),s.handleFinish=s.handleFinish.bind(Object(g.a)(s)),s.doSort=s.doSort.bind(Object(g.a)(s)),s.pushMessage=s.pushMessage.bind(Object(g.a)(s)),s.stepBackMessage=s.stepBackMessage.bind(Object(g.a)(s)),s.alert=s.alert.bind(Object(g.a)(s)),s}return Object(d.a)(a,[{key:"alert",value:function(t){var e=this;this.setState({showNotification:!0,notificationMessage:t}),setTimeout((function(){return e.setState({showNotification:!1,notificationMessage:""})}),2e3)}},{key:"doSort",value:function(){this.setState({visibilityDefault:"default"===this.props.params.mode?"inline":"none",visibilityStepping:"stepping"===this.props.params.mode?"inline":"none"}),this.logger.current.clearMessage(),this.canvasCore.current.start()}},{key:"componentDidUpdate",value:function(t){this.props!==t&&this.setState({settings:this.props.params})}},{key:"handleStart",value:function(t){this.doSort(),t.preventDefault()}},{key:"handlePause",value:function(t){this.canvasCore.current.cancel(),t.preventDefault()}},{key:"handleContinue",value:function(t){this.canvasCore.current.continue(),t.preventDefault()}},{key:"handleNextStep",value:function(t){this.canvasCore.current.step(),t.preventDefault()}},{key:"handlePrevStep",value:function(t){this.canvasCore.current.stepBack(),t.preventDefault()}},{key:"handleFinish",value:function(){this.setState({visibilityDefault:"none"})}},{key:"pushMessage",value:function(t){"enabled"===this.state.settings.logging&&(this.setState({newMessage:t}),this.logger.current.addMessage(t))}},{key:"stepBackMessage",value:function(){"enabled"===this.state.settings.logging&&this.logger.current.stepBackMessage()}},{key:"render",value:function(){var t=this;return Object(N.jsxs)("div",{children:[Object(N.jsx)(x.a,{size:"md",show:this.state.showNotification,onHide:function(){return t.setState({showNotification:!1,notificationMessage:""})},children:Object(N.jsx)(x.a.Header,{closeButton:!0,children:this.state.notificationMessage})}),Object(N.jsxs)(v.a,{children:[Object(N.jsx)(O.a,{md:"8",children:Object(N.jsx)(T,{ref:this.canvasCore,finish:this.handleFinish,params:this.state.settings,pushMessage:this.pushMessage,stepBackMessage:this.stepBackMessage,alert:this.alert,className:"Canvas"})}),Object(N.jsx)(O.a,{md:"4",style:{visibility:"enabled"===this.state.settings.logging?"visible":"hidden"},children:Object(N.jsx)(M,{ref:this.logger,mode:this.state.settings.mode})})]}),Object(N.jsx)(v.a,{children:Object(N.jsxs)(O.a,{md:"6",children:[Object(N.jsx)(y.a,{onClick:this.handleStart,children:"Start"}),"  ",Object(N.jsx)(y.a,{style:{display:this.state.visibilityDefault},onClick:this.handlePause,children:"Pause"}),"  ",Object(N.jsx)(y.a,{style:{display:this.state.visibilityDefault},onClick:this.handleContinue,children:"Continue"}),"  ",Object(N.jsx)(y.a,{style:{display:this.state.visibilityStepping},onClick:this.handleNextStep,children:"Next Step"}),"  ",Object(N.jsx)(y.a,{style:{display:this.state.visibilityStepping},onClick:this.handlePrevStep,children:"Previous Step"})]})})]})}}]),a}(i.a.Component),_=(a(90),function(t){Object(p.a)(a,t);var e=Object(j.a)(a);function a(t){var s;return Object(u.a)(this,a),(s=e.call(this,t)).sortAnimator=i.a.createRef(),s.state={settings:{arraySize:50,algorithm:"bubblesort",customAlgorithm:"",specialInput:"random",operationInterval:5,mode:"default",logging:"disabled"},curTab:"setting"},s.handleInputChange=s.handleInputChange.bind(Object(g.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(g.a)(s)),s}return Object(d.a)(a,[{key:"handleInputChange",value:function(t){var e=t.target,a=e.value,s=e.name;this.setState((function(t){return{settings:Object(h.a)(Object(h.a)({},t.settings),{},Object(c.a)({},s,a))}})),t.preventDefault()}},{key:"setKey",value:function(t){this.setState({curTab:t})}},{key:"handleSubmit",value:function(t){this.setKey("animator"),this.sortAnimator.current.doSort(),t.preventDefault()}},{key:"componentDidMount",value:function(){var t=JSON.parse(localStorage.getItem("sort"));t.length>0&&this.setState((function(e){return{settings:Object(h.a)(Object(h.a)({},e.settings),{},{customAlgorithm:t[0]})}}))}},{key:"render",value:function(){var t=this,e=JSON.parse(localStorage.getItem("sort")).map((function(t){return Object(N.jsx)("option",{value:t,children:t},t)}));return Object(N.jsxs)(m.a,{defaultActiveKey:"setting",activeKey:this.state.curTab,onSelect:function(e){return t.setKey(e)},className:"SortingAlgorithmContainer",children:[Object(N.jsx)(b.a,{className:"SortingAlgorithmTab",eventKey:"setting",title:"Setting",children:Object(N.jsxs)(f.a,{onSubmit:this.handleSubmit,children:[Object(N.jsxs)(f.a.Group,{as:v.a,controlId:"arraySize",children:[Object(N.jsx)(f.a.Label,{column:!0,md:"2",children:"Array Size"}),Object(N.jsx)(O.a,{md:"3",children:Object(N.jsx)(f.a.Control,{required:!0,type:"number",name:"arraySize",value:this.state.settings.arraySize,onChange:this.handleInputChange})})]}),Object(N.jsxs)(f.a.Group,{as:v.a,controlId:"algorithm",children:[Object(N.jsx)(f.a.Label,{column:!0,md:"2",children:"Algorithm"}),Object(N.jsx)(O.a,{md:"3",children:Object(N.jsxs)(f.a.Control,{as:"select",name:"algorithm",value:this.state.settings.algorithm,onChange:this.handleInputChange,children:[Object(N.jsx)("option",{value:"bubblesort",children:"Bubble sort"}),Object(N.jsx)("option",{value:"selectionsort",children:"Selection sort"}),Object(N.jsx)("option",{value:"insertionsort",children:"Insertion sort"}),Object(N.jsx)("option",{value:"odd_even_sort",children:"Odd-even sort"}),Object(N.jsx)("option",{value:"cocktail_sort",children:"Cocktail sort"}),Object(N.jsx)("option",{value:"quicksort",children:"Quicksort"}),Object(N.jsx)("option",{value:"heapsort",children:"Heapsort"}),Object(N.jsx)("option",{value:"mergesort",children:"Merge sort"}),Object(N.jsx)("option",{value:"bitonic_mergesort",children:"Bitonic mergesort"}),Object(N.jsx)("option",{value:"introsort",children:"Introsort"}),Object(N.jsx)("option",{value:"custom_algorithm",children:"Custom algorithm"})]})})]}),Object(N.jsxs)(f.a.Group,{as:v.a,style:{display:"custom_algorithm"===this.state.settings.algorithm?"flex":"none"},controlId:"customAlgorithm",children:[Object(N.jsx)(f.a.Label,{column:!0,md:"2",children:"Custom Algorithm"}),Object(N.jsx)(O.a,{md:"3",children:Object(N.jsx)(f.a.Control,{as:"select",name:"customAlgorithm",value:this.state.settings.customAlgorithm,onChange:this.handleInputChange,children:e})})]}),Object(N.jsxs)(f.a.Group,{as:v.a,controlId:"specialInput",children:[Object(N.jsx)(f.a.Label,{column:!0,md:"2",children:"Special Input"}),Object(N.jsx)(O.a,{md:"3",children:Object(N.jsxs)(f.a.Control,{as:"select",name:"specialInput",value:this.state.settings.specialInput,onChange:this.handleInputChange,children:[Object(N.jsx)("option",{value:"random",children:"None (Random)"}),Object(N.jsx)("option",{value:"sorted",children:"Sorted"}),Object(N.jsx)("option",{value:"reversed",children:"Reversed"})]})})]}),Object(N.jsxs)(f.a.Group,{as:v.a,controlId:"operationInterval",children:[Object(N.jsx)(f.a.Label,{column:!0,md:"2",children:"Operation Intervals (ms)"}),Object(N.jsx)(O.a,{md:"3",children:Object(N.jsx)(f.a.Control,{required:!0,type:"number",name:"operationInterval",value:this.state.settings.operationInterval,onChange:this.handleInputChange})})]}),Object(N.jsxs)(f.a.Group,{as:v.a,controlId:"mode",children:[Object(N.jsx)(f.a.Label,{column:!0,md:"2",children:"Mode"}),Object(N.jsx)(O.a,{md:"3",children:Object(N.jsxs)(f.a.Control,{as:"select",name:"mode",value:this.state.settings.mode,onChange:this.handleInputChange,children:[Object(N.jsx)("option",{value:"default",children:"Default"}),Object(N.jsx)("option",{value:"stepping",children:"Stepping"})]})})]}),Object(N.jsxs)(f.a.Group,{as:v.a,controlId:"logging",children:[Object(N.jsx)(f.a.Label,{column:!0,md:"2",children:"Step Logging"}),Object(N.jsx)(O.a,{md:"3",children:Object(N.jsxs)(f.a.Control,{as:"select",name:"logging",value:this.state.settings.logging,onChange:this.handleInputChange,children:[Object(N.jsx)("option",{value:"disabled",children:"Disabled"}),Object(N.jsx)("option",{value:"enabled",children:"Enabled"})]})})]}),Object(N.jsx)(f.a.Group,{as:v.a,controlId:"startButton",children:Object(N.jsx)(O.a,{md:{span:1,offset:11},children:Object(N.jsx)(y.a,{className:"startButton",variant:"primary",type:"submit",children:"Start"})})})]})}),Object(N.jsx)(b.a,{className:"SortingAlgorithmTab",eventKey:"animator",title:"Animator",children:Object(N.jsx)(L,{params:this.state.settings,ref:this.sortAnimator})})]})}}]),a}(i.a.Component));function R(){return Object(N.jsx)("div",{children:"graph"})}function P(){return Object(N.jsx)("div",{children:"homePage"})}var D=a(104),B=a(105),F=a(78),E=(a(92),a(75)),q=a.n(E),z=a(70),G=a(67),H='\n(function someDemo() {\n  var test = "Hello World!";\n  console.log(test);\n})();\n\nreturn () => <App />;\n',J={root:Object(h.a)({boxSizing:"border-box",fontFamily:'"Dank Mono", "Fira Code", monospace',minHeight:"500px"},G.a.plain)},U=function(t){Object(p.a)(a,t);var e=Object(j.a)(a);function a(){var t;Object(u.a)(this,a);for(var i=arguments.length,n=new Array(i),r=0;r<i;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))).state={code:H},t.onValueChange=function(e){t.setState({code:e})},t.highlight=function(t){return Object(N.jsx)(z.a,Object(h.a)(Object(h.a)({},z.b),{},{theme:G.a,code:t,language:"jsx",children:function(t){t.className,t.style;var e=t.tokens,a=t.getLineProps,i=t.getTokenProps;return Object(N.jsx)(s.Fragment,{children:e.map((function(t,e){return Object(N.jsx)("div",Object(h.a)(Object(h.a)({},a({line:t,key:e})),{},{children:t.map((function(t,e){return Object(N.jsx)("span",Object(h.a)({},i({token:t,key:e})))}))}))}))})}}))},t}return Object(d.a)(a,[{key:"doSave",value:function(){this.props.saveAlgorithm(this.state.code)}},{key:"loadCode",value:function(t){this.setState({code:t})}},{key:"render",value:function(){return Object(N.jsx)(q.a,{value:this.state.code,onValueChange:this.onValueChange,highlight:this.highlight,padding:10,style:J.root})}}]),a}(i.a.Component),W={sort:"Sorting"},K=function(t){Object(p.a)(a,t);var e=Object(j.a)(a);function a(t){var s;if(Object(u.a)(this,a),(s=e.call(this,t)).state={algorithmType:"sort",algorithmName:"",requestedAlgorithmType:"",showNotification:!1,showAlgorithmListDialog:!1},!localStorage.getItem("sort")){localStorage.setItem("sort",JSON.stringify([]))}return s.editor=i.a.createRef(),s.saveAlgorithm=s.saveAlgorithm.bind(Object(g.a)(s)),s.saveCode=s.saveCode.bind(Object(g.a)(s)),s.handleInputChange=s.handleInputChange.bind(Object(g.a)(s)),s.getAlgorithms=s.getAlgorithms.bind(Object(g.a)(s)),s.loadAlgorithm=s.loadAlgorithm.bind(Object(g.a)(s)),s.deleteAlgorithm=s.deleteAlgorithm.bind(Object(g.a)(s)),s.alert=s.alert.bind(Object(g.a)(s)),s}return Object(d.a)(a,[{key:"alert",value:function(t){var e=this;this.setState({showNotification:!0,notificationMessage:t}),setTimeout((function(){return e.setState({showNotification:!1,notificationMessage:""})}),2e3)}},{key:"saveCode",value:function(){this.editor.current.doSave()}},{key:"deleteAlgorithm",value:function(){if(""!==this.state.algorithmName){var t="customAlgo."+this.state.algorithmType+"."+this.state.algorithmName,e=JSON.parse(localStorage.getItem(this.state.algorithmType)),a=e.indexOf(this.state.algorithmName);-1!==a?(e.splice(a,1),localStorage.setItem(this.state.algorithmType,JSON.stringify(e)),localStorage.removeItem(t),this.alert("Algorithm removed successfully: "+this.state.algorithmName+" ("+this.state.algorithmType+")")):this.alert("Cannot delete algorithm: specified algorithm doesn't exist")}else this.alert("Cannot delete algorithm: algorithm name is missing")}},{key:"saveAlgorithm",value:function(t){if(""!==this.state.algorithmName){var e="customAlgo."+this.state.algorithmType+"."+this.state.algorithmName,a=JSON.parse(localStorage.getItem(this.state.algorithmType));-1===a.indexOf(this.state.algorithmName)&&(a.push(this.state.algorithmName),localStorage.setItem(this.state.algorithmType,JSON.stringify(a))),localStorage.getItem(e)?(localStorage.setItem(e,t),this.alert("Algorithm saved successfully: "+this.state.algorithmName+" ("+this.state.algorithmType+")")):(localStorage.setItem(e,t),this.alert("New algorithm created successfully: "+this.state.algorithmName+" ("+this.state.algorithmType+")"))}else this.alert("Cannot create algorithm: algorithm name is missing")}},{key:"handleInputChange",value:function(t){var e=t.target,a=e.value,s=e.name;this.setState(Object(c.a)({},s,a)),"algorithmType"===s&&this.editor.loadTemplate(),t.preventDefault()}},{key:"getAlgorithms",value:function(t){this.setState({showAlgorithmListDialog:!0,requestedAlgorithmType:t})}},{key:"loadAlgorithm",value:function(t,e){var a="customAlgo."+t+"."+e;this.setState({algorithmType:t,algorithmName:e}),this.editor.current.loadCode(localStorage.getItem(a))}},{key:"render",value:function(){var t=this,e=null;this.state.showAlgorithmListDialog&&(e=JSON.parse(localStorage.getItem(this.state.requestedAlgorithmType)).map((function(e,a){return Object(N.jsxs)("tr",{onClick:function(){t.loadAlgorithm(t.state.requestedAlgorithmType,e),t.setState({showAlgorithmListDialog:!1,requestedAlgorithmType:""})},children:[Object(N.jsx)("td",{children:a+1}),Object(N.jsx)("td",{children:e})]},e)})));return Object(N.jsxs)("div",{className:"Workshop",children:[Object(N.jsx)(x.a,{size:"md",show:this.state.showNotification,onHide:function(){return t.setState({showNotification:!1,notificationMessage:""})},children:Object(N.jsx)(x.a.Header,{closeButton:!0,children:this.state.notificationMessage})}),Object(N.jsxs)(x.a,{size:"lg",show:this.state.showAlgorithmListDialog,onHide:function(){return t.setState({showAlgorithmListDialog:!1,requestedAlgorithmType:""})},centered:!0,children:[Object(N.jsx)(x.a.Header,{closeButton:!0,children:Object(N.jsx)(x.a.Title,{children:"My "+W[this.state.requestedAlgorithmType]+" Algorithms"})}),Object(N.jsx)(x.a.Body,{children:Object(N.jsxs)(D.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(N.jsx)("thead",{children:Object(N.jsxs)("tr",{children:[Object(N.jsx)("th",{}),Object(N.jsx)("th",{children:"Algorithm Name"})]})}),Object(N.jsx)("tbody",{children:e})]})})]}),Object(N.jsxs)(v.a,{children:[Object(N.jsxs)(f.a,{as:O.a,md:"8",className:"AlgorithmInfoFormDisplay",children:[Object(N.jsx)(B.a,{className:"OpenAlgorithmButton",title:"Open Algorithm",children:Object(N.jsx)(F.a.Item,{as:"button",onClick:function(){t.getAlgorithms("sort")},children:"Sorting"})}),Object(N.jsxs)(f.a.Group,{className:"AlgorithmInfoFormDisplay",controlId:"algorithmName",children:[Object(N.jsx)(f.a.Label,{className:"AlgorithmInfoFormLabel",children:"Algorithm Name"}),Object(N.jsx)(O.a,{children:Object(N.jsx)(f.a.Control,{required:!0,name:"algorithmName",value:this.state.algorithmName,onChange:this.handleInputChange})})]}),Object(N.jsxs)(f.a.Group,{className:"AlgorithmInfoFormDisplay",controlId:"algorithmType",children:[Object(N.jsx)(f.a.Label,{className:"AlgorithmInfoFormLabel",children:"Algorithm Type"}),Object(N.jsx)(O.a,{children:Object(N.jsx)(f.a.Control,{as:"select",name:"algorithmType",value:this.state.algorithmType,onChange:this.handleInputChange,children:Object(N.jsx)("option",{value:"sort",children:"Sorting Algorithm"})})})]})]}),Object(N.jsxs)(O.a,{md:{span:2,offset:2},children:[Object(N.jsx)(y.a,{onClick:this.saveCode,children:"Save"}),Object(N.jsx)(y.a,{className:"DeleteButton",onClick:this.deleteAlgorithm,children:"Delete"})]})]}),Object(N.jsx)(v.a,{children:Object(N.jsx)(O.a,{md:"12",className:"CodeEditor",children:Object(N.jsx)(U,{ref:this.editor,saveAlgorithm:this.saveAlgorithm})})})]})}}]),a}(i.a.Component),V=a(108),Q=a(79);a(93);function X(){return Object(N.jsxs)(o.a,{children:[Object(N.jsxs)(V.a,{bg:"dark",variant:"dark",children:[Object(N.jsx)(V.a.Brand,{href:"#home",children:"AlgoViz"}),Object(N.jsxs)(Q.a,{className:"mr-auto",children:[Object(N.jsx)(Q.a.Link,{href:"/",children:"Home"}),Object(N.jsx)(Q.a.Link,{href:"/sort",children:"Sort"}),Object(N.jsx)(Q.a.Link,{href:"/graph",children:"Graph"}),Object(N.jsx)(Q.a.Link,{href:"/workshop",children:"Workshop"})]})]}),Object(N.jsxs)(l.c,{children:[Object(N.jsx)(l.a,{exact:!0,path:"/",children:Object(N.jsx)(P,{})}),Object(N.jsx)(l.a,{path:"/sort",children:Object(N.jsx)(_,{})}),Object(N.jsx)(l.a,{path:"/graph",children:Object(N.jsx)(R,{})}),Object(N.jsx)(l.a,{path:"/workshop",children:Object(N.jsx)(K,{})})]})]})}a(96);var Y=function(){return Object(N.jsx)("div",{className:"App",children:Object(N.jsx)(X,{})})},Z=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,110)).then((function(e){var a=e.getCLS,s=e.getFID,i=e.getFCP,n=e.getLCP,r=e.getTTFB;a(t),s(t),i(t),n(t),r(t)}))};r.a.render(Object(N.jsx)(i.a.StrictMode,{children:Object(N.jsx)(Y,{})}),document.getElementById("root")),Z()}},[[97,1,2]]]);
//# sourceMappingURL=main.2a6fbf4a.chunk.js.map