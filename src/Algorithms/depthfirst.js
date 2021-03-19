/*
Depth-First search is a popular graph or tree traversal algorithm.
It works by fully exploring the depth of a particular path before exploring its breadth.
*/

export function depthfirst(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  let stack = [];
  stack.push(startNode);
  
  while (stack.length > 0){
    let currentNode = stack.pop();
    console.log(`${currentNode} just came out of the stack`);

    currentNode.isVisited = true;
    if (currentNode === finishNode) return visitedNodesInOrder;
    
    visitedNodesInOrder.push(currentNode);

    let unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);

    for (let neighbour of unvisitedNeighbours) {
      if (neighbour.isWall) continue;

      neighbour.previousNode = currentNode;
      stack.push(neighbour);
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

export function getDepthFirstNodesInShortestPathOrder(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}