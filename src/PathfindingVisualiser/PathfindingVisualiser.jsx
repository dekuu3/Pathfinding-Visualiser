import React, { Component } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import Node from "./Node/Node";

import "./PathfindingVisualiser.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

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
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  //Event handler for the resetGrid button - it clears all nodes and walls
  resetGrid() {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        let currentRowToReset = row;
        let currentColToReset = col;
        if (
          !(
            document.getElementById(
              `node-${currentRowToReset}-${currentColToReset}`
            ).className === "node node-start" ||
            document.getElementById(
              `node-${currentRowToReset}-${currentColToReset}`
            ).className === "node node-finish"
          )
        ) {
          document.getElementById(
            `node-${currentRowToReset}-${currentColToReset}`
          ).className = "node";
        } else {
        }
      }
    }
    this.componentDidMount();
  }

  //similar to resetGrid() but this one leaves walls up - preferably to be called before an algorithm runs
  resetGridExceptWalls() {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        let currentRowToReset = row;
        let currentColToReset = col;

        if (
          !(
            document.getElementById(
              `node-${currentRowToReset}-${currentColToReset}`
            ).className === "node node-wall" ||
            document.getElementById(
              `node-${currentRowToReset}-${currentColToReset}`
            ).className === "node node-start" ||
            document.getElementById(
              `node-${currentRowToReset}-${currentColToReset}`
            ).className === "node node-finish"
          )
        ) {
          document.getElementById(
            `node-${currentRowToReset}-${currentColToReset}`
          ).className = "node";
        } else {
        }
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

  //Event handler for the "visualiseDijkstra" button which runs the Dijkstra algo
  visualiseDijkstra() {
    this.resetGridExceptWalls();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];

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

  //Event handler for the visualiseAstar" button which runs the A* algo
  visualiseAstar() {}

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualiseDijkstra()}>
          Visualise Dijkstra's Algorithm
        </button>

        <button onClick={() => this.visualiseAstar()}>
          Visualise A*'s Algorithm
        </button>

        <button onClick={() => this.resetGrid()}>Clear Grid</button>

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
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallsOn = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
