/*
Breadth-first search is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all of the neighbour nodes at the present depth prior to moving on to the nodes at the next depth level.
*/

export function breadthfirst(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  let queue = [];
  queue.push(startNode);

  while (queue.length > 0) {
    let currentNode = queue.shift();

    if (currentNode === finishNode) return visitedNodesInOrder;
    
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    let unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

    for (let neighbour of unvisitedNeighbours) {
      if (neighbour.isWall) continue;
      if (queue.includes(neighbour)) continue;
      neighbour.previousNode = currentNode;
      queue.push(neighbour);
    }
  }
  return visitedNodesInOrder;
}

//Gets neighbours on each side of a node
function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let {col, row} = node;
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);  
  if (row > 0) neighbours.push(grid[row - 1][col]);
  
  return neighbours.filter(neighbour => !neighbour.isVisited);
}

export function getBreadthFirstNodesInShortestPathOrder(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}