(this["webpackJsonppathfinding-visualiser-webapp"]=this["webpackJsonppathfinding-visualiser-webapp"]||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n.n(r),a=n(9),s=n.n(a),i=(n(16),n(17),n(7)),c=n(1),l=n(3),u=n(4),d=n(6),h=n(5);function f(e,t,n){var r=[];if(!t||!n||t===n)return!1;t.distance=0;for(var o=function(e){var t,n=[],r=Object(c.a)(e);try{for(r.s();!(t=r.n()).done;){var o,a=t.value,s=Object(c.a)(a);try{for(s.s();!(o=s.n()).done;){var i=o.value;n.push(i)}}catch(l){s.e(l)}finally{s.f()}}}catch(l){r.e(l)}finally{r.f()}return n}(e);o.length;){m(o);var a=o.shift();if(!a.isWall){if(a.distance===1/0)return r;if(a.isVisited=!0,r.push(a),a===n)return r;v(a,e)}}}function m(e){e.sort((function(e,t){return e.distance-t.distance}))}function v(e,t){var n,r=function(e,t){var n=[],r=e.col,o=e.row;o>0&&n.push(t[o-1][r]);o<t.length-1&&n.push(t[o+1][r]);r>0&&n.push(t[o][r-1]);r<t[0].length-1&&n.push(t[o][r+1]);return n.filter((function(e){return!e.isVisited}))}(e,t),o=Object(c.a)(r);try{for(o.s();!(n=o.n()).done;){var a=n.value;a.distance=e.distance+1,a.previousNode=e}}catch(s){o.e(s)}finally{o.f()}}function g(e,t){for(var n=e.length-1;n>=0;n--)e[n]===t&&e.splice(n,1)}function j(e,t){var n=[],r=e.col,o=e.row;return o>0&&n.push(t[o-1][r]),o<t.length-1&&n.push(t[o+1][r]),r>0&&n.push(t[o][r-1]),r<t[0].length-1&&n.push(t[o][r+1]),n.filter((function(e){return!e.isVisited}))}function b(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)}function p(e,t){var n=[],r=e.col,o=e.row;return r>0&&n.push(t[o][r-1]),o<t.length-1&&n.push(t[o+1][r]),r<t[0].length-1&&n.push(t[o][r+1]),o>0&&n.push(t[o-1][r]),n.filter((function(e){return!e.isVisited}))}function y(e,t){var n=[],r=e.col,o=e.row;return r<t[0].length-1&&n.push(t[o][r+1]),r>0&&n.push(t[o][r-1]),o<t.length-1&&n.push(t[o+1][r]),o>0&&n.push(t[o-1][r]),n.filter((function(e){return!e.isVisited}))}function O(e,t){var n=[],r=e.col,o=e.row;return r>0&&n.push(t[o][r-1]),o<t.length-1&&n.push(t[o+1][r]),r<t[0].length-1&&n.push(t[o][r+1]),o>0&&n.push(t[o-1][r]),n.filter((function(e){return!e.isVisited}))}function x(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)}function w(e,t){for(var n=e.length-1;n>=0;n--)e[n]===t&&e.splice(n,1)}n(18);var I=n(0),E=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,r=e.isFinish,o=e.isStart,a=e.isWall,s=e.onMouseDown,i=e.onMouseEnter,c=e.onMouseUp,l=r?"node-finish":o?"node-start":a?"node-wall":"";return Object(I.jsx)("div",{id:"node-".concat(t,"-").concat(n),className:"node ".concat(l),onMouseDown:function(){return s(t,n)},onMouseEnter:function(){return i(t,n)},onMouseUp:function(){return c()}})}}]),n}(r.Component),B=(n(20),n(11)),N=[],T=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).setAlgorithmStats=function(e,t){document.getElementById("traversedNodes").innerHTML="".concat(e.length," nodes"),1===t.length?document.getElementById("pathLength").innerHTML="No path found":document.getElementById("pathLength").innerHTML="".concat(t.length," nodes")},e.calculateExecutionTime=function(e,t){return(t-e).toFixed(3)},e.setTableData=function(t,n,r,o){var a;a=1===o.length?"No Path Found":o.length.toString(),N.push({algorithm:t,executionTime:"".concat(n," ms"),totalNodes:r.length.toString(),pathLength:a}),e.setState({state:e.state})},e.renderTableData=function(e,t){return Object(I.jsxs)("tr",{children:[Object(I.jsx)("td",{children:e.algorithm}),Object(I.jsx)("td",{children:e.executionTime}),Object(I.jsx)("td",{children:e.totalNodes}),Object(I.jsx)("td",{children:e.pathLength})]},t)},e.state={grid:[],mouseIsPressed:!1},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=k();this.setState({grid:e})}},{key:"resetGrid",value:function(){var e,t=this.state.grid,n=Object(c.a)(t);try{for(n.s();!(e=n.n()).done;){var r,o=e.value,a=Object(c.a)(o);try{for(a.s();!(r=a.n()).done;){var s=r.value,i=s.col,l=s.row;"node node-start"!==document.getElementById("node-".concat(l,"-").concat(i)).className&&"node node-finish"!==document.getElementById("node-".concat(l,"-").concat(i)).className&&(document.getElementById("node-".concat(l,"-").concat(i)).className="node"),s.isVisited=!1}}catch(u){a.e(u)}finally{a.f()}}}catch(u){n.e(u)}finally{n.f()}document.getElementById("gridIDTextArea").innerHTML=null,this.componentDidMount()}},{key:"resetGridExceptWalls",value:function(){var e,t=this.state.grid,n=Object(c.a)(t);try{for(n.s();!(e=n.n()).done;){var r,o=e.value,a=Object(c.a)(o);try{for(a.s();!(r=a.n()).done;){var s=r.value,i=s.col,l=s.row;"node node-wall"!==document.getElementById("node-".concat(l,"-").concat(i)).className&&"node node-start"!==document.getElementById("node-".concat(l,"-").concat(i)).className&&"node node-finish"!==document.getElementById("node-".concat(l,"-").concat(i)).className&&(document.getElementById("node-".concat(l,"-").concat(i)).className="node"),s.isVisited=!1}}catch(u){a.e(u)}finally{a.f()}}}catch(u){n.e(u)}finally{n.f()}}},{key:"handleMouseDown",value:function(e,t){var n=D(this.state.grid,e,t);this.setState({grid:n,mouseIsPressed:!0})}},{key:"handleMouseEnter",value:function(e,t){if(this.state.mouseIsPressed){var n=D(this.state.grid,e,t);this.setState({grid:n})}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"visualiseAlgorithm",value:function(e){this.resetGrid();var t,n,r,o,a,s=this.state.grid,i=s[10][10],l=s[10][40];"Dijkstra"===e&&(t=performance.now(),n=f(s,i,l),r=performance.now(),o=this.calculateExecutionTime(t,r),document.getElementById("timer").innerHTML="".concat(o," ms"),a=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(l),document.getElementById("helpfulHints").innerHTML="Dijkstra's Algorithm is <b><u>weighted</b></u> and guarantees the shortest path!"),"A*"===e&&(t=performance.now(),n=function(e,t,n){var r=[];if(!t||!n||t===n)return!1;var o=[],a=[];for(t.gValue=0,o.push(t);o.length>0;){for(var s=0,i=0;i<o.length;i++)o[i].fValue<o[s].fValue&&(s=i);var l=o[s];if(l.isVisited=!0,l===n)return r;g(o,l),r.push(l),a.push(l);var u,d=j(l,e),h=Object(c.a)(d);try{for(h.s();!(u=h.n()).done;){var f=u.value;if(!f.isWall&&!a.includes(f)){var m=l.gValue+1;o.includes(f)?m<f.gValue&&(f.gValue=m):(f.gValue=m,f.hValue=b(f,n),f.fValue=f.gValue+f.hValue,f.previousNode=l,o.push(f))}}}catch(v){h.e(v)}finally{h.f()}}return r}(s,i,l),r=performance.now(),o=this.calculateExecutionTime(t,r),document.getElementById("timer").innerHTML="".concat(o," ms"),a=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(l),document.getElementById("helpfulHints").innerHTML="A*'s Algorithm is <b><u>weighted</b></u> and guarantees the shortest path!"),"Depth-First"===e&&(t=performance.now(),n=function(e,t,n){var r=[];if(!t||!n||t===n)return!1;var o=[];for(o.push(t);o.length>0;){var a=o.pop();if(a.isVisited=!0,a===n)return r;r.push(a);var s,i=p(a,e),l=Object(c.a)(i);try{for(l.s();!(s=l.n()).done;){var u=s.value;u.isWall||(u.previousNode=a,o.push(u))}}catch(d){l.e(d)}finally{l.f()}}return r}(s,i,l),r=performance.now(),o=this.calculateExecutionTime(t,r),document.getElementById("timer").innerHTML="".concat(o," ms"),a=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(l),document.getElementById("helpfulHints").innerHTML="Depth-First Search is <b><u>unweighted</b></u> and does not guarantees the shortest path!"),"Breadth-First"===e&&(t=performance.now(),n=function(e,t,n){var r=[];if(!t||!n||t===n)return!1;var o=[];for(o.push(t);o.length>0;){var a=o.shift();if(a===n)return r;a.isVisited=!0,r.push(a);var s,i=y(a,e),l=Object(c.a)(i);try{for(l.s();!(s=l.n()).done;){var u=s.value;u.isWall||o.includes(u)||(u.previousNode=a,o.push(u))}}catch(d){l.e(d)}finally{l.f()}}return r}(s,i,l),r=performance.now(),o=this.calculateExecutionTime(t,r),document.getElementById("timer").innerHTML="".concat(o," ms"),a=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(l),document.getElementById("helpfulHints").innerHTML="Breadth-First Search is <b><u>unweighted</b></u> and guarantees the shortest path!"),"Greedy"===e&&(t=performance.now(),n=function(e,t,n){var r=[];if(!t||!n||t===n)return!1;var o=[];for(t.hValue=x(t,n),o.push(t);o.length>0;){for(var a=0,s=0;s<o.length;s++)o[s].hValue<o[a].hValue&&(a=s);var i=o[a];if(w(o,i),i.isVisited=!0,i===n)return r;r.push(i);var l,u=O(i,e),d=Object(c.a)(u);try{for(d.s();!(l=d.n()).done;){var h=l.value;h.isWall||o.includes(h)||(h.previousNode=i,h.hValue=x(h,n),o.push(h))}}catch(f){d.e(f)}finally{d.f()}}return r}(s,i,l),r=performance.now(),o=this.calculateExecutionTime(t,r),document.getElementById("timer").innerHTML="".concat(o," ms"),a=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(l),document.getElementById("helpfulHints").innerHTML="Greedy Best-First Search is <b><u>weighted</b></u> and does not guarantees the shortest path!"),console.log(n),this.animateAlgorithm(n,a),this.setAlgorithmStats(n,a),this.setTableData(e,o,n,a)}},{key:"animateAlgorithm",value:function(e,t){for(var n=this,r=function(r){if(r===e.length)return setTimeout((function(){n.animateShortestPath(t)}),10*r),{v:void 0};setTimeout((function(){var t=e[r];"node node-start"!==document.getElementById("node-".concat(t.row,"-").concat(t.col)).className&&"node node-finish"!==document.getElementById("node-".concat(t.row,"-").concat(t.col)).className&&(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited")}),10*r)},o=0;o<=e.length;o++){var a=r(o);if("object"===typeof a)return a.v}}},{key:"animateShortestPath",value:function(e){for(var t=function(t){setTimeout((function(){var n=e[t];"node node-start"!==document.getElementById("node-".concat(n.row,"-").concat(n.col)).className&&"node node-finish"!==document.getElementById("node-".concat(n.row,"-").concat(n.col)).className&&(document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-shortest-path")}),20*t)},n=0;n<e.length;n++)t(n)}},{key:"randomizeWalls",value:function(){this.resetGrid();var e,t=this.state.grid,n=Object(c.a)(t);try{for(n.s();!(e=n.n()).done;){var r,o=e.value,a=Object(c.a)(o);try{for(a.s();!(r=a.n()).done;){var s=r.value,i=s.col,l=s.row;if("node node-start"!==document.getElementById("node-".concat(l,"-").concat(i)).className&&"node node-finish"!==document.getElementById("node-".concat(l,"-").concat(i)).className&&1===Math.floor(6*Math.random())){var u=D(this.state.grid,l,i);this.setState({grid:u})}}}catch(d){a.e(d)}finally{a.f()}}}catch(d){n.e(d)}finally{n.f()}}},{key:"randomizeWallsPreset",value:function(e){this.resetGrid();var t=this.state.grid,n=-1,r=[];switch(e){case"1":r="1000000100010100011001000100101000001101011101100100000010111000000010000000001100000100001011000110111111001011011100000100000000000110110011000100100000000010001111010100011110011110010010101100110100000011110100001001010000000001100000010100001010000010100100100100011000010010100011001010001001001001000000100010000110010001100000000000001010000001011000000001000110011111111011001010100000001000100110100000001001100000001001111011110000101100100000101010000110000000000010110010000000111001111100010000002001001000110000000100001000013111100100011110100101011000010000100100100000000000110011001001100000100001000011000000000001001010100000100100011001000101110011011101001110000000101011101000000100011000000000110001101001000000100110110000110000110000110000100001010001100110010000110110001000101010010100110001000100000100000000001110000000010010001010010000001001001110001110100100000010010100100100010000000000010000100001000010100010011101000101110000000000000010000010011000001001001011".split("");break;case"2":r="0100010110110110000101000010000010000000000010010010000010000100001000100100100100010000100110011011000000111110010110010101010011100001000100000010110010010000101100010100101010110010101010010001000010001111011000101000001010011001100010110111100011110111000100000010010101111011001101101001000111000100010000100000000110010100100001011110100000100010101110000000000011100100001100101000011000010010000110110000000000111011000101100011000110001001000110101110110010000101010000100100110001010000010001100011002010110101000100000100011011003000100010011010001101000101000000100001001110010110000011000001010001111100000000010110000000000110101001100111000000000100011000000001111010001000000001100100110010010010010100101110001000001011010010000110011001101100000000000100011000000010000101000100110000100110001001000000000010011010111010000100000101011100100001110100100000001101010000100000000011000000010110000001101010011100111000101000110010001101001000010000000001010010000011010100010111001000".split("");break;case"3":r="0110100000010110110000001011000001000110000011000111001000100010000010100000010011001100000100000011010101000001010011000100100001011001001001010000000101010010100010100010000000000010000000010011001001100101001100010001000100110001100010000110010110100110000111010000000101001111000000000000000001010100011000000000001010000101010000100000000100011100010000101011001010100100110101101001111011000011111100001010110101001100001010100000001000000000001010110010110011000000100100110000100110100010001000010111102000000101100000011011000100003000100000010000001100111000000110001000000111001111101000000010101001000001000000010000100000001000100110010001011010010000010000000011010100110100000001000000001000000100100101000001110110100010010000100001001100000001001001110101100011101100000101001000000000000000010000000001011001010010101111101000101010000000001001110110010101010011100001000000001000011110100010001000100100001000111001110100000110000001001001001000010101011011100001000000101000010000".split("");break;case"4":r="0000111000001000000001100000000101000000001100000010100010001000000000000000001000010000100000000000000000100000001000000000000100000101001100100011000000000100001001010010100000010000000100010000001001000000000110000010110000010001010000011001010000000000000000000000001000000000100001000100000100001100000000101000000010000000000000100000000000100000001001110000000000001110000001010000000110000000000011000000000000001000000001001000010011001010001000000100000000000000010101101000100000000000000000000001002001010011001000000000010100003000000001000000001010000000000001000010000000010001000100000000001000000000100000001100000000001001100000010000011100000001001000010100011001000000000000011011001000000000110000000000000001000000100000000010100011000000001001000000000000000000000000100101010001000001100000000000000100100000000100001000110000100000000010001000000000011010000001000000000000000001010000000000000000100000000000101000000000000010011100000000000001000000000001000000000000000010".split("");break;case"5":r="0000110000000100000000000000010000000001010000000110010000000010000001000000010010100011000000000000000000000000000000010000000000010000100000000110001100000000001000010000010000100000000000000000000000000000000000000000000010100000000000100000000000001100000000011000000100000111100000000000100000100000000010101001000000000000000000010000101011100001000010010000010000000101001101001010000000000010001000110000000000000000000001000010000000000000010000000100000000010000000000000101100000000000000110000100002000000010010000010010010000003000100000001000100001000100000101001010000100010000101100000000000001000101000100011001000000001001000000010000101100010010000001000000100001011101001001000000000100001000010001101110100100100100000000000000100000100000000000000100000000000000000000100000000011000000010000000000000000010000000100000010000010000000000101000000000000000010000000100000100000111000000001000000101000000000100100000100000000000010010001100010000010000000010000000000110001010000".split("");break;case"6":r="0000000001001100001000000000000000000000100000000001000000001000000000000100000000101000101000000010000000111000100000001000100000001000000000000100100010000101001000101100010000100000000100100011000000100010000100001010000000000000010000000100000000000000000110000000000010000001110000001000010100000000100010000000000100110000000000000110010110111000000000010010000001000001000101010000000000001000100000000010000001000100100001000011000000100010101100000000110010101000100000000000011100000000110000000000002000000000000000010001000100113000000000000010000000001000000101001000000000000100000000000000000000110000000000100010000000100001000000100100001000001000000000000010011001001000001000001110010001000000100000000010100001110010000100110000000100000000000010000100000100000000000000100101000000101000100000000000101000100110100000000100100000000001000000000000001100010000110000000000010000000100000000101000000000100000000100000010000010000100000000001100000010110000000000000100000000001000".split("")}var o,a=Object(c.a)(t);try{for(a.s();!(o=a.n()).done;){var s,i=o.value,l=Object(c.a)(i);try{for(l.s();!(s=l.n()).done;){var u=s.value;n++;var d=u.col,h=u.row;if("node node-start"!==document.getElementById("node-".concat(h,"-").concat(d)).className&&"node node-finish"!==document.getElementById("node-".concat(h,"-").concat(d)).className&&"1"===r[n]){var f=D(this.state.grid,h,d);this.setState({grid:f})}}}catch(m){l.e(m)}finally{l.f()}}}catch(m){a.e(m)}finally{a.f()}}},{key:"receiveInputForGridIDTextArea",value:function(){var e,t=this.state.grid,n=-1,r=document.getElementById("gridIDTextArea").value;if(1e3===r.length){e=r.split("");var o,a=Object(c.a)(t);try{for(a.s();!(o=a.n()).done;){var s,i=o.value,l=Object(c.a)(i);try{for(l.s();!(s=l.n()).done;){var u=s.value;n++;var d=u.col,h=u.row;if("node node-start"!==document.getElementById("node-".concat(h,"-").concat(d)).className&&"node node-finish"!==document.getElementById("node-".concat(h,"-").concat(d)).className&&"1"===e[n]){var f=D(this.state.grid,h,d);this.setState({grid:f})}}}catch(m){l.e(m)}finally{l.f()}}}catch(m){a.e(m)}finally{a.f()}document.getElementById("gridIDTextArea").value=""}else alert("Input must be a String with 1000 Integers (eg. 011001...)")}},{key:"setGridIDTextArea",value:function(){var e,t=this.state.grid,n="",r=Object(c.a)(t);try{for(r.s();!(e=r.n()).done;){var o,a=e.value,s=Object(c.a)(a);try{for(s.s();!(o=s.n()).done;){var i=o.value,l=i.col,u=i.row;"node node-start"===document.getElementById("node-".concat(u,"-").concat(l)).className?n+="2":"node node-finish"===document.getElementById("node-".concat(u,"-").concat(l)).className?n+="3":"node node-wall"===document.getElementById("node-".concat(u,"-").concat(l)).className?n+="1":n+="0"}}catch(d){s.e(d)}finally{s.f()}}}catch(d){r.e(d)}finally{r.f()}document.getElementById("gridIDTextArea").value=n,this.setState({state:this.state})}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,r=t.mouseIsPressed;return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)("div",{class:"dropdown",children:[Object(I.jsx)("button",{class:"dropbtn",children:"Select Your Algorithm \u25bc"}),Object(I.jsxs)("div",{id:"myDropdown",class:"dropdown-content",children:[Object(I.jsx)("button",{onClick:function(){return e.visualiseAlgorithm("Dijkstra")},children:"Dijkstra Algorithm"}),Object(I.jsx)("button",{onClick:function(){return e.visualiseAlgorithm("A*")},children:"A* Algorithm"}),Object(I.jsx)("button",{onClick:function(){return e.visualiseAlgorithm("Depth-First")},children:"Depth-First Search"}),Object(I.jsx)("button",{onClick:function(){return e.visualiseAlgorithm("BreadthFirst")},children:"Breadth-First Search"}),Object(I.jsx)("button",{onClick:function(){return e.visualiseAlgorithm("Greedy")},children:"Greedy Best First Search"})]})]}),Object(I.jsx)("button",{class:"btn",onClick:function(){return e.resetGrid()},children:"Clear Grid"}),Object(I.jsx)("button",{class:"btn",onClick:function(){return e.randomizeWalls()},children:"Randomize Grid"}),Object(I.jsxs)("div",{class:"dropdown2",children:[Object(I.jsx)("button",{class:"dropbtn2",children:"Grid Presets \u25bc"}),Object(I.jsxs)("div",{id:"myDropdown2",class:"dropdown-content2",children:[Object(I.jsx)("button",{onClick:function(){return e.randomizeWallsPreset("1")},children:"33% Preset #1"}),Object(I.jsx)("button",{onClick:function(){return e.randomizeWallsPreset("2")},children:"33% Preset #2"}),Object(I.jsx)("button",{onClick:function(){return e.randomizeWallsPreset("3")},children:"33% Preset #3"}),Object(I.jsx)("button",{onClick:function(){return e.randomizeWallsPreset("4")},children:"16% Preset #4"}),Object(I.jsx)("button",{onClick:function(){return e.randomizeWallsPreset("5")},children:"16% Preset #5"}),Object(I.jsx)("button",{onClick:function(){return e.randomizeWallsPreset("6")},children:"16% Preset #6"})]})]}),Object(I.jsxs)("a",{href:"https://github.com/dekuu3/Pathfinding-Visualiser",target:"_blank",rel:"noopener noreferrer",children:["Source Code ",Object(I.jsx)("code",{children:"</>"})]}),Object(I.jsx)("p",{children:Object(I.jsx)("span",{id:"helpfulHints",children:"Hold your mouse button to build walls! Remember to clear the grid before you randomize grid or run a new algorithm!"})}),Object(I.jsx)("div",{className:"grid",children:n.map((function(t,n){return Object(I.jsx)("div",{children:t.map((function(t,n){var o=t.row,a=t.col,s=t.isFinish,i=t.isStart,c=t.isWall;return Object(I.jsx)(E,{col:a,row:o,isFinish:s,isStart:i,isWall:c,mouseIsPressed:r,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()}},n)}))},n)}))}),Object(I.jsxs)("h4",{children:["Execution time: ",Object(I.jsx)("span",{id:"timer",children:"- -"})]}),Object(I.jsxs)("h4",{children:["Total traversed nodes: ",Object(I.jsx)("span",{id:"traversedNodes",children:"- -"})]}),Object(I.jsxs)("h4",{children:["Path Length: ",Object(I.jsx)("span",{id:"pathLength",children:"- -"})]}),Object(I.jsx)("div",{className:"algorithmDataTable",children:Object(I.jsxs)(B.a,{children:[Object(I.jsx)("thead",{children:Object(I.jsxs)("tr",{children:[Object(I.jsx)("th",{children:" Algorithm "}),Object(I.jsx)("th",{children:" Execution Time "}),Object(I.jsx)("th",{children:" Nodes Traversed "}),Object(I.jsx)("th",{children:" Path Length "})]})}),Object(I.jsx)("tbody",{children:N.map(this.renderTableData)})]})}),Object(I.jsxs)("div",{class:"gridIDTextArea",children:[Object(I.jsx)("button",{onClick:function(){return e.setGridIDTextArea()},class:"btn",children:"Update Grid ID"}),Object(I.jsx)("button",{onClick:function(){return e.receiveInputForGridIDTextArea()},class:"btn",children:"Input Grid ID"}),Object(I.jsx)("br",{}),Object(I.jsx)("p",{children:"You can use this area to see the current grid state above or input your own."}),Object(I.jsx)("p",{children:"It only inputs/outputs strings with 1000 integers because our grid is 50x20."}),Object(I.jsx)("p",{children:"This is useful if you wish to reproduce these results for yourself!"}),Object(I.jsx)("p",{children:"0 = traversable node | 1 = wall | 2 = start node | 3 = finish node"}),Object(I.jsx)("textarea",{id:"gridIDTextArea",type:"text",placeholder:"Grid ID",cols:"100"})]})]})}}]),n}(r.Component),k=function(){for(var e=[],t=0;t<20;t++){for(var n=[],r=0;r<50;r++)n.push(M(r,t));e.push(n)}return e},M=function(e,t){return{row:t,col:e,isStart:10===t&&10===e,isFinish:10===t&&40===e,distance:1/0,isVisited:!1,isWall:!1,previousNode:null,gValue:1/0,hValue:1/0,fValue:1/0}},D=function(e,t,n){var r=e.slice(),o=r[t][n];if(10===o.row&&10===o.col)return e;if(10===o.row&&40===o.col)return e;var a=Object(i.a)(Object(i.a)({},o),{},{isWall:!o.isWall});return r[t][n]=a,r};var V=function(){return Object(I.jsx)("div",{className:"App",children:Object(I.jsx)(T,{})})};s.a.render(Object(I.jsx)(o.a.StrictMode,{children:Object(I.jsx)(V,{})}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.5a4ba04b.chunk.js.map