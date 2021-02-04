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
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
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