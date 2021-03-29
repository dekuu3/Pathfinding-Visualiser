import React, { Component } from "react";
import {
  dijkstra,
  getDijkstraNodesInShortestPathOrder,
} from "../Algorithms/dijkstra";
import { astar, getAstarNodesInShortestPathOrder } from "../Algorithms/astar";
import { depthfirst, getDepthFirstNodesInShortestPathOrder } from "../Algorithms/depthfirst";
import { breadthfirst, getBreadthFirstNodesInShortestPathOrder } from "../Algorithms/breadthfirst";
import { greedybestfirst, getGreedyBestFirstNodesInShortestPathOrder } from "../Algorithms/greedybestfirst";
import Node from "./Node/Node";
import "./PathfindingVisualiser.css";
import Table from "react-bootstrap/Table";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;
let tableData = [];

export default class PathfindingVisualiser extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  //Grid setup using nodes
  componentDidMount() {
    let grid = getInitialGrid();
    this.setState({ grid });
  }

  //Event handler for the resetGrid button - it clears all nodes and walls
  resetGrid() {
    let { grid } = this.state;

    for (let row of grid) {
      for (let node of row) {
        let { col, row } = node;
        if (
          !(
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-start" ||
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-finish"
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
        node.isVisited = false;
      }
    }
    document.getElementById("gridIDTextArea").innerHTML = null;
    this.componentDidMount();
  }

  //similar to resetGrid() but this one leaves walls up - preferably to be called before an algorithm runs
  resetGridExceptWalls() {
    let { grid } = this.state;
    for (let row of grid) {
      for (let node of row) {
        let { col, row } = node;
        if (
          !(
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-wall" ||
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-start" ||
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-finish"
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
        node.isVisited = false;
      }
    }
  }

  //Mouse event handler for mousedown
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallsOn(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  //Mouse event handler for when mouse pointer enters a new node whilst being pressed
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallsOn(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  //Mouse event handler for when mouse button isnt pressed
  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  //Fills in the h3 labels with the correct stats
  setAlgorithmStats = (traversedNodes, pathLength) => {
    document.getElementById(
      "traversedNodes"
    ).innerHTML = `${traversedNodes.length} nodes`;

    if (pathLength.length === 1) {
      document.getElementById("pathLength").innerHTML = `No path found`;
    } else {
      document.getElementById(
        "pathLength"
      ).innerHTML = `${pathLength.length} nodes`;
    }
  };

  calculateExecutionTime = (startTime, elapsedTime) => {
    return (elapsedTime - startTime).toFixed(3);
  };

  //Event handler for the "visualiseDijkstra" button which runs the Dijkstra algo
  visualiseDijkstra() {
    this.resetGridExceptWalls();
    let { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let startTime = performance.now();
    let visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    let elapsedTime = performance.now();
    let executionTime = this.calculateExecutionTime(startTime, elapsedTime);
    document.getElementById("timer").innerHTML = `${executionTime} ms`;
    let nodesInShortestPathOrder = getDijkstraNodesInShortestPathOrder(
      finishNode
    );
    console.log(visitedNodesInOrder);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setAlgorithmStats(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setTableData(
      "Dijkstra",
      executionTime,
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    document.getElementById("helpfulHints").innerHTML = `Dijkstra's Algorithm is <b><u>weighted</b></u> and guarantees the shortest path!`;
  }

  //Event handler for the "visualiseAstar" button which runs the A* algo
  visualiseAstar() {
    this.resetGridExceptWalls();
    let { grid } = this.state;
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let startTime = performance.now();
    let visitedNodesInOrder = astar(grid, startNode, finishNode);
    let elapsedTime = performance.now();
    let executionTime = this.calculateExecutionTime(startTime, elapsedTime);
    document.getElementById("timer").innerHTML = `${executionTime} ms`;
    let nodesInShortestPathOrder = getAstarNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setAlgorithmStats(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setTableData(
      "A*",
      executionTime,
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    document.getElementById("helpfulHints").innerHTML = `A*'s Algorithm is <b><u>weighted</b></u> and guarantees the shortest path!`;
  }

  //Event handler for the "visualiseDepthFirst" button which runs the depth-first search algorithm 
  visualiseDepthFirst() {
    this.resetGridExceptWalls();
    let { grid } = this.state;
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let startTime = performance.now();
    let visitedNodesInOrder = depthfirst(grid, startNode, finishNode);
    let elapsedTime = performance.now();
    let executionTime = this.calculateExecutionTime(startTime, elapsedTime);
    document.getElementById("timer").innerHTML = `${executionTime} ms`;
    let nodesInShortestPathOrder = getDepthFirstNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setAlgorithmStats(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setTableData(
      "Depth-First",
      executionTime,
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    document.getElementById("helpfulHints").innerHTML = `Depth-First Search is <b><u>unweighted</b></u> and does not guarantees the shortest path!`;
  }

   //Event handler for the "visualiseBreadthFirst" button which runs the breadth-first search algorithm
   visualiseBreadthFirst() {
    this.resetGridExceptWalls();
    let { grid } = this.state;
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let startTime = performance.now();
    let visitedNodesInOrder = breadthfirst(grid, startNode, finishNode);
    let elapsedTime = performance.now();
    let executionTime = this.calculateExecutionTime(startTime, elapsedTime);
    document.getElementById("timer").innerHTML = `${executionTime} ms`;
    let nodesInShortestPathOrder = getBreadthFirstNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setAlgorithmStats(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setTableData(
      "Breadth-First",
      executionTime,
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    document.getElementById("helpfulHints").innerHTML = `Breadth-First Search is <b><u>unweighted</b></u> and guarantees the shortest path!`;
  }

   //Event handler for the "visualiseGreedyBestFirst" button which runs the breadth-first search algorithm
   visualiseGreedyBestFirst() {
    this.resetGridExceptWalls();
    let { grid } = this.state;
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let startTime = performance.now();
    let visitedNodesInOrder = greedybestfirst(grid, startNode, finishNode);
    let elapsedTime = performance.now();
    let executionTime = this.calculateExecutionTime(startTime, elapsedTime);
    document.getElementById("timer").innerHTML = `${executionTime} ms`;
    let nodesInShortestPathOrder = getGreedyBestFirstNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setAlgorithmStats(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setTableData(
      "Greedy Best-First",
      executionTime,
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    document.getElementById("helpfulHints").innerHTML = `Greedy Best-First Search is <b><u>weighted</b></u> and does not guarantees the shortest path!`;
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        let node = visitedNodesInOrder[i];

        if (
          !(
            document.getElementById(`node-${node.row}-${node.col}`)
              .className === "node node-start" ||
            document.getElementById(`node-${node.row}-${node.col}`)
              .className === "node node-finish"
          )
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
        //this was causing this entire react component to re-render every x milliseconds, which was lagging out our pc/animation
        //instead we now update the class of the element to "visited"
        //this.setState({ grid: newGrid });
      }, 10 * i);
    }
  }

  //Animates the shortest path
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];

        if (
          !(
            document.getElementById(`node-${node.row}-${node.col}`)
              .className === "node node-start" ||
            document.getElementById(`node-${node.row}-${node.col}`)
              .className === "node node-finish"
          )
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 20 * i);
    }
  }

  randomizeWalls() {
    this.resetGrid();
    
    let { grid } = this.state;
    
    for (let row of grid) {
      for (let node of row) {
        let { col, row } = node;
        if (
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-start" ||
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-finish"
        ) continue;

        if (Math.floor(Math.random() * 6) === 1) {
          let newGrid = getNewGridWithWallsOn(this.state.grid, row, col);
          this.setState({ grid: newGrid });
        }
      }
    }
  };

  randomizeWallsPreset(presetNumber) {
    this.resetGrid();
    let { grid } = this.state;
    let index = -1;
    let gridPreset = [];
    let gridPreset1String = "1000000100010100011001000100101000001101011101100100000010111000000010000000001100000100001011000110111111001011011100000100000000000110110011000100100000000010001111010100011110011110010010101100110100000011110100001001010000000001100000010100001010000010100100100100011000010010100011001010001001001001000000100010000110010001100000000000001010000001011000000001000110011111111011001010100000001000100110100000001001100000001001111011110000101100100000101010000110000000000010110010000000111001111100010000002001001000110000000100001000013111100100011110100101011000010000100100100000000000110011001001100000100001000011000000000001001010100000100100011001000101110011011101001110000000101011101000000100011000000000110001101001000000100110110000110000110000110000100001010001100110010000110110001000101010010100110001000100000100000000001110000000010010001010010000001001001110001110100100000010010100100100010000000000010000100001000010100010011101000101110000000000000010000010011000001001001011";

    let gridPreset2String = "0100010110110110000101000010000010000000000010010010000010000100001000100100100100010000100110011011000000111110010110010101010011100001000100000010110010010000101100010100101010110010101010010001000010001111011000101000001010011001100010110111100011110111000100000010010101111011001101101001000111000100010000100000000110010100100001011110100000100010101110000000000011100100001100101000011000010010000110110000000000111011000101100011000110001001000110101110110010000101010000100100110001010000010001100011002010110101000100000100011011003000100010011010001101000101000000100001001110010110000011000001010001111100000000010110000000000110101001100111000000000100011000000001111010001000000001100100110010010010010100101110001000001011010010000110011001101100000000000100011000000010000101000100110000100110001001000000000010011010111010000100000101011100100001110100100000001101010000100000000011000000010110000001101010011100111000101000110010001101001000010000000001010010000011010100010111001000";

    let gridPreset3String = "0110100000010110110000001011000001000110000011000111001000100010000010100000010011001100000100000011010101000001010011000100100001011001001001010000000101010010100010100010000000000010000000010011001001100101001100010001000100110001100010000110010110100110000111010000000101001111000000000000000001010100011000000000001010000101010000100000000100011100010000101011001010100100110101101001111011000011111100001010110101001100001010100000001000000000001010110010110011000000100100110000100110100010001000010111102000000101100000011011000100003000100000010000001100111000000110001000000111001111101000000010101001000001000000010000100000001000100110010001011010010000010000000011010100110100000001000000001000000100100101000001110110100010010000100001001100000001001001110101100011101100000101001000000000000000010000000001011001010010101111101000101010000000001001110110010101010011100001000000001000011110100010001000100100001000111001110100000110000001001001001000010101011011100001000000101000010000";

    let gridPreset4String = "0000111000001000000001100000000101000000001100000010100010001000000000000000001000010000100000000000000000100000001000000000000100000101001100100011000000000100001001010010100000010000000100010000001001000000000110000010110000010001010000011001010000000000000000000000001000000000100001000100000100001100000000101000000010000000000000100000000000100000001001110000000000001110000001010000000110000000000011000000000000001000000001001000010011001010001000000100000000000000010101101000100000000000000000000001002001010011001000000000010100003000000001000000001010000000000001000010000000010001000100000000001000000000100000001100000000001001100000010000011100000001001000010100011001000000000000011011001000000000110000000000000001000000100000000010100011000000001001000000000000000000000000100101010001000001100000000000000100100000000100001000110000100000000010001000000000011010000001000000000000000001010000000000000000100000000000101000000000000010011100000000000001000000000001000000000000000010";

    let gridPreset5String = "0000110000000100000000000000010000000001010000000110010000000010000001000000010010100011000000000000000000000000000000010000000000010000100000000110001100000000001000010000010000100000000000000000000000000000000000000000000010100000000000100000000000001100000000011000000100000111100000000000100000100000000010101001000000000000000000010000101011100001000010010000010000000101001101001010000000000010001000110000000000000000000001000010000000000000010000000100000000010000000000000101100000000000000110000100002000000010010000010010010000003000100000001000100001000100000101001010000100010000101100000000000001000101000100011001000000001001000000010000101100010010000001000000100001011101001001000000000100001000010001101110100100100100000000000000100000100000000000000100000000000000000000100000000011000000010000000000000000010000000100000010000010000000000101000000000000000010000000100000100000111000000001000000101000000000100100000100000000000010010001100010000010000000010000000000110001010000";

    let gridPreset6String = "0000000001001100001000000000000000000000100000000001000000001000000000000100000000101000101000000010000000111000100000001000100000001000000000000100100010000101001000101100010000100000000100100011000000100010000100001010000000000000010000000100000000000000000110000000000010000001110000001000010100000000100010000000000100110000000000000110010110111000000000010010000001000001000101010000000000001000100000000010000001000100100001000011000000100010101100000000110010101000100000000000011100000000110000000000002000000000000000010001000100113000000000000010000000001000000101001000000000000100000000000000000000110000000000100010000000100001000000100100001000001000000000000010011001001000001000001110010001000000100000000010100001110010000100110000000100000000000010000100000100000000000000100101000000101000100000000000101000100110100000000100100000000001000000000000001100010000110000000000010000000100000000101000000000100000000100000010000010000100000000001100000010110000000000000100000000001000";
  
    switch (presetNumber) {
      case "1":
        gridPreset = gridPreset1String.split("");
        break;
      case "2":
        gridPreset = gridPreset2String.split("");
        break;
      case "3":
        gridPreset = gridPreset3String.split("");
        break;
      case "4":
        gridPreset = gridPreset4String.split("");
        break;
      case "5":
        gridPreset = gridPreset5String.split("");
        break;
      case "6":
        gridPreset = gridPreset6String.split("");
        break;
      default: break;
    }
    
    for (let row of grid) {
      for (let node of row) {
        index++;
        let { col, row } = node;
        if (
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-start" ||
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-finish"
        ) continue;

        if (gridPreset[index] === "1") {
          let newGrid = getNewGridWithWallsOn(this.state.grid, row, col);
          this.setState({ grid: newGrid });
        }
      }
    }
  };

  receiveInputForGridIDTextArea() {
    let { grid } = this.state;
    let index = -1;
    let gridPreset = [];
    let text = document.getElementById("gridIDTextArea").value;

    if (text.length !== 1000 ) {
      alert("Input must be a String with 1000 Integers (eg. 011001...)")
      return;
    }

    gridPreset = text.split("");

    for (let row of grid) {
      for (let node of row) {
        index++;
        let { col, row } = node;
        if (
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-start" ||
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-finish"
        ) continue;

        if (gridPreset[index] === "1") {
          let newGrid = getNewGridWithWallsOn(this.state.grid, row, col);
          this.setState({ grid: newGrid });
        }
      }
    }
    document.getElementById("gridIDTextArea").value = "";
  }

  setGridIDTextArea() {
    let { grid } = this.state;
    let text = "";

    for (let row of grid) {
      for (let node of row) {
        let { col, row } = node;
        if(document.getElementById(`node-${row}-${col}`).className ===
        "node node-start"){
          text += "2";
        } else if (document.getElementById(`node-${row}-${col}`).className ===
        "node node-finish"){
          text += "3"; 
        } else if (document.getElementById(`node-${row}-${col}`).className ===
        "node node-wall"){
          text += "1"
        } else {
          text += "0";
        }
      }
    } 
    document.getElementById("gridIDTextArea").value = text;
    this.setState({state: this.state});
  }

  setTableData = (algorithmName, executionTime, traversedNodes, pathLength) => {
    let tempPathLength;
    if (pathLength.length === 1) {
      tempPathLength = "No Path Found";
    } else {
      tempPathLength = pathLength.length.toString();
    }

    tableData.push({
      algorithm: algorithmName,
      executionTime: `${executionTime} ms`,
      totalNodes: traversedNodes.length.toString(),
      pathLength: tempPathLength,
    });

    this.setState({ state: this.state });
  };

  renderTableData = (tableData, index) => {
    return (
      <tr key={index}>
        <td>{tableData.algorithm}</td>
        <td>{tableData.executionTime}</td>
        <td>{tableData.totalNodes}</td>
        <td>{tableData.pathLength}</td>
      </tr>
    );
  };

  render() {
    let { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div class="dropdown">
          <button class="dropbtn">Select Your Algorithm ▼</button>
          <div id="myDropdown" class="dropdown-content">
            <button onClick={() => this.visualiseDijkstra()}>Dijkstra Algorithm</button>
            <button onClick={() => this.visualiseAstar()}>A* Algorithm</button>
            <button onClick={() => this.visualiseDepthFirst()}>Depth-First Search</button>
            <button onClick={() => this.visualiseBreadthFirst()}>Breadth-First Search</button>
            <button onClick={() => this.visualiseGreedyBestFirst()}>Greedy Best First Search</button>
          </div>
        </div>

        <button class="btn" onClick={() => this.resetGrid()}>Clear Grid</button>

        <button class="btn" onClick={() => this.randomizeWalls()}>Randomize Grid</button>

        <div class="dropdown2">
          <button class="dropbtn2">Grid Presets ▼</button>
          <div id="myDropdown2" class="dropdown-content2">
            <button onClick={() => this.randomizeWallsPreset("1")}>33% Preset #1</button>
            <button onClick={() => this.randomizeWallsPreset("2")}>33% Preset #2</button>
            <button onClick={() => this.randomizeWallsPreset("3")}>33% Preset #3</button>
            <button onClick={() => this.randomizeWallsPreset("4")}>16% Preset #4</button>
            <button onClick={() => this.randomizeWallsPreset("5")}>16% Preset #5</button>
            <button onClick={() => this.randomizeWallsPreset("6")}>16% Preset #6</button>
          </div>
        </div>

        <a href="https://github.com/dekuu3/Pathfinding-Visualiser" target="_blank" rel="noopener noreferrer">Source Code <code>&lt;/&gt;</code></a>

        <p>
          <span id="helpfulHints">Hold your mouse button to build walls! Remember to clear the grid before you randomize grid or run a new algorithm!</span>
        </p>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <h4>
          Execution time: <span id="timer">- -</span>
        </h4>
        <h4>
          Total traversed nodes: <span id="traversedNodes">- -</span>
        </h4>
        <h4>
          Path Length: <span id="pathLength">- -</span>
        </h4>
        <div className="algorithmDataTable">
          <Table>
            <thead>
              <tr>
                <th> Algorithm </th>
                <th> Execution Time </th>
                <th> Nodes Traversed </th>
                <th> Path Length </th>
              </tr>
            </thead>
            <tbody>{tableData.map(this.renderTableData)}</tbody>
          </Table>
        </div>
        <div class="gridIDTextArea">
        <button onClick={() => this.setGridIDTextArea()} class="btn">Update Grid ID</button>
        <button onClick={() => this.receiveInputForGridIDTextArea()} class="btn">Input Grid ID</button>
        <br></br>
        <p>You can use this area to see the current grid state above or input your own.</p>
        <p>It only inputs/outputs strings with 1000 integers because our grid is 50x20.</p>
        <p>This is useful if you wish to reproduce these results for yourself!</p>
        <p>0 = traversable node | 1 = wall | 2 = start node | 3 = finish node</p>
        <textarea id="gridIDTextArea" type="text" placeholder="Grid ID" cols="100"></textarea>
        </div>
      </>
    );
  }
}

let getInitialGrid = () => {
  let grid = [];
  for (let row = 0; row < 20; row++) {
    let currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

let createNode = (col, row) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    gValue: Infinity,
    hValue: Infinity,
    fValue: Infinity,
  };
};

let getNewGridWithWallsOn = (grid, row, col) => {
  let newGrid = grid.slice();
  let node = newGrid[row][col];

  if (node.row === START_NODE_ROW && node.col === START_NODE_COL){
    return grid;
  }
  if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL){
    return grid;
  }
  
  let newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
