const fs = require('fs');
const inputData = JSON.parse(fs.readFileSync('input.json'));
const n = inputData.n;
const m = inputData.m;
const grid = inputData.grid;

function isValidCell(row, col) {
  return row >= 0 && row < n && col >= 0 && col < m && grid[row][col] === '.';
}

function hasActorInDirection(row, col, direction) {
  if (direction === 'left') {
    for (let c = col - 1; c >= 0; c--) {
      if (grid[row][c] === 'X') {
        return true;
      }
    }
  } else if (direction === 'up') {
    for (let r = row - 1; r >= 0; r--) {
      if (grid[r][col] === 'X') {
        return true;
      }
    }
  } else if (direction === 'right') {
    for (let c = col + 1; c < m; c++) {
      if (grid[row][c] === 'X') {
        return true;
      }
    }
  } else if (direction === 'down') {
    for (let r = row + 1; r < n; r++) {
      if (grid[r][col] === 'X') {
        return true;
      }
    }
  }
  return false;
}

let numGoodPositions = 0;
for (let row = 0; row < n; row++) {
  for (let col = 0; col < m; col++) {
    if (grid[row][col] === '.') {
      if (hasActorInDirection(row, col, 'left') ||
          hasActorInDirection(row, col, 'up') ||
          hasActorInDirection(row, col, 'right') ||
          hasActorInDirection(row, col, 'down')) {
        numGoodPositions++;
      }
    }
  }
}

const outputData = {
  numGoodPositions: numGoodPositions
};
fs.writeFileSync('output.json', JSON.stringify(outputData));