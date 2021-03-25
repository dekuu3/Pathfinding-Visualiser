/*
Greedy best first search algorithm
Objective is to minimize heuristic function h(n) = g, this is the cost to the current node from the start node
*/

export function greedybestfirst(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  let pQueue = [];
  startNode.hValue = calculateHValue(startNode, finishNode)
  pQueue.push(startNode);

  while (pQueue.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < pQueue.length; i++){
      if (pQueue[i].hValue < pQueue[lowestIndex].hValue) {
        lowestIndex = i;
      }
    }
    let currentNode = pQueue[lowestIndex];

    popFromArray(pQueue, currentNode)

    currentNode.isVisited = true;

    if (currentNode === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(currentNode);

    let unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

    for (let neighbour of unvisitedNeighbours) {
      if (neighbour.isWall) continue;
      if (pQueue.includes(neighbour)) continue;
      neighbour.previousNode = currentNode;
      neighbour.hValue = calculateHValue(neighbour, finishNode)
      pQueue.push(neighbour);
    }
  }
  return visitedNodesInOrder;
}

//Gets neighbours on each side of a node
function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let {col, row} = node;
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row > 0) neighbours.push(grid[row - 1][col]);
  
  return neighbours.filter(neighbour => !neighbour.isVisited);
}

//Calculates Manhattan Distance between 2 coordinates
function calculateHValue(node, finishNode) {
  return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)};

function popFromArray(arr, element) {
  for (let i = arr.length-1; i>=0; i--){
    if (arr[i] === element) {
      arr.splice(i,1); 
    }
  }
}

export function getGreedyBestFirstNodesInShortestPathOrder(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}