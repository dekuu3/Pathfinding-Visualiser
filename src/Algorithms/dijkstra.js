/*
DIJKSTRA Description
You start at your start node (distance = 0) and assume every other node in the grid has a distance of Infinity.
From the starting node, grab all adjacent nodes and update their distance to "d istance + 1"

This returns all nodes in the order in which they were visited. Also has the nodes point back to their previous nodes to allow us to find the shortest path.
*/

/* Comment this for now
const node = {
  row,
  col, 
  isVisited, 
  distance,
}*/

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    //remove later
    console.log(closestNode);
    /*
    Add walls later
    Add error handling for no results possible later
    Add animation later
    */
   closestNode.isVisited = true;
   visitedNodesInOrder.push(closestNode);
   if (closestNode === finishNode) return 'success'; // change success to "visitedNodesInOrder" so youre able to animate the algos later
   updateUnvisitedNeighours(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighours(node, grid) {
  const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (const neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
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

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
