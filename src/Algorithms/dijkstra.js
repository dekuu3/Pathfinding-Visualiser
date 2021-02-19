/*
DIJKSTRA Description
You start at your start node (distance = 0) and assume every other node in the grid has a distance of Infinity.
From the starting node, grab all adjacent nodes and update their distance to "d istance + 1"

This returns all nodes in the order in which they were visited. Also has the nodes point back to their previous nodes to allow us to find the shortest path.
*/

export function dijkstra(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  startNode.distance = 0;
  let unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    let closestNode = unvisitedNodes.shift();
    //console.log(closestNode);
    //if it finds a wall, continue
    if (closestNode.isWall) continue;
    //if the closest node is at a distance of infinity, we stop
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighours(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighours(node, grid) {
  let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (let neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
}

function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let {col, row} = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter(neighbour => !neighbour.isVisited);
}

function getAllNodes(grid) {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

//Reverses from the finish node to find the shortest path
//Must be called after the dijkstras algorithm
export function getDijkstraNodesInShortestPathOrder(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
