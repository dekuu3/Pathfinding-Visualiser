/*
A* Description
A* uses a best-first search approach to find the lowest cost way between start and end nodes. It does this via a heuristic function, to determine the order in which to navigate nodes. This heuristic is the sum of two functions (Zarembo & Kodors, 2013):
G — exact cost of the path from initial node to the current node;
H — admissible (not overestimated) cost of reaching the goal from current node;
F = G + H— cost to reach goal, if the current node is chosen as next node in the path. 
*/

export function astar(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let openSet = [];
  let closedSet = [];
  startNode.gValue = 0;
  openSet.push(startNode);

  while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++){
      if (openSet[i].fValue < openSet[lowestIndex].fValue) {
        lowestIndex = i;
      }
    }
    let currentNode = openSet[lowestIndex];
    currentNode.isVisited = true;

    if (currentNode === finishNode) return visitedNodesInOrder;

    popFromArray(openSet, currentNode);
    visitedNodesInOrder.push(currentNode);
    closedSet.push(currentNode);

    let unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

    for (const neighbour of unvisitedNeighbours) {
      if (neighbour.isWall) continue;

      if (!closedSet.includes(neighbour)) {
        let tempGValue = currentNode.gValue + 1;
        
        if (openSet.includes(neighbour)){
          if (tempGValue < neighbour.gValue) {
            neighbour.gValue = tempGValue;
          }
        } else {
          neighbour.gValue = tempGValue;
          neighbour.hValue = calculateHValue(neighbour, finishNode);
          neighbour.fValue = neighbour.gValue + neighbour.hValue
          neighbour.previousNode = currentNode;
          openSet.push(neighbour)
        }
      }
    }
  }
  //no solution found
  return visitedNodesInOrder;
}

function popFromArray(arr, element) {
  for (let i = arr.length-1; i>=0; i--){
    if (arr[i] === element) {
      arr.splice(i,1); 
    }
  }
}

//Gets neighbours on each side of a node
function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let {col, row} = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter(neighbour => !neighbour.isVisited);
}

//Calculates Manhattan Distance between 2 coordinates
function calculateHValue(node, finishNode) {
  return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)};
  
//Reverses from the finish node to find the shortest path
//Must be called after the A* algorithm
export function getAstarNodesInShortestPathOrder(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
