/*
A* Description
A* uses a best-first search approach to find the lowest cost way between start and end nodes. It does this via a heuristic function, to determine the order in which to navigate nodes. This heuristic is the sum of two functions (Zarembo & Kodors, 2013):
G — exact cost of the path from initial node to the current node;
H — admissible (not overestimated) cost of reaching the goal from current node;
F = G + H— cost to reach goal, if the current node is chosen as next node in the path. 
*/

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  let openSet = [];
  let closedSet = [];
  openSet.push(startNode);
  let gValue = 0;

  while (openSet.length > 1) {
    //1) find node with the least f on the open list, call it currentNode
    let optimalFValue = 0;
    for (let i = 0; i < openSet.length; i++){
      if (openSet[i].f < openSet[optimalFValue].f) {
        optimalFValue = i;
      }
    }
    let currentNode = openSet[optimalFValue];
    if (currentNode === finishNode) {
      console.log("Done!");
      return visitedNodesInOrder;
    }

    //2) pop currentNode off the openSet
    popFromArray(openSet, currentNode);
    //set currentNode.isVisited = true?

    //3) generate currentNode's 4 neighbours and set their parentNode's to currentNode

    const unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

    //4.1) for each neighbour
    //if neighbour = goal, stop
    //else
    //neighbour.g = currentNode.g + distance between neighbour and currentNode
    //neighbour.h = distance from goal to neighbour
    //neighbour.f = neighbour.g + neighbour.h

    for (const neighbour of unvisitedNeighbours) {
      if (neighbour.col === finishNode.col && neighbour.row === finishNode.row) return visitedNodesInOrder;
      else {

      }
      neighbour.distance = currentNode.distance + 1;
      neighbour.previousNode = currentNode;
    }

    //4.2) if a node with the same position as neighbour is in openSet, which has a lower f than neighbour, skip this neighbour

    //4.3) if a node with the same position as neighbour is in the closedSet, which has a lower f than neighbour, skip this neighbour
    //otherwise, add the node to the openSet

    //5) push currentNode on the closedSet
    closedSet.push(currentNode);
  }

  //no solution found
  startNode.distance = 0;
}

function popFromArray(arr, element) {
  for (var i = arr.length-1; i>=0; i--){
    if (arr[i] == element) {
      arr.splice(i,1); 
    }
  }
}

function getUnvisitedNeighbours(node, grid) {
  const neighbours = [];
  const {col, row} = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter(neighbour => !neighbour.isVisited);
}