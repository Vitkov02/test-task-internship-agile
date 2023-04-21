const fs = require('fs');
const inputData = JSON.parse(fs.readFileSync('input.json'));

const maxRecord = 101;

function calculateWeight(diskLoaders) {
  let weight = 20;
  for (let i = 0; i < diskLoaders.length; i += 2) {
    const kgWeight = diskLoaders[i];
    const lbWeight = diskLoaders[i + 1] * 0.45;
    weight += kgWeight + lbWeight;
  }
  return weight;
}

function isValid(diskLoaders) {
  if (diskLoaders.length > 24) {
    return false;
  }
  const counts = {};
  for (const weight of diskLoaders) {
    counts[weight] = (counts[weight] || 0) + 1;
  }
  for (const weight of [0.5, 1, 2.5, 5, 10, 15, 20, 25]) {
    const total = (counts[weight] || 0) + (counts[weight * 2] || 0);
    if (total % 2 !== 0) {
      return false;
    }
    if (total > 12) {
      return false;
    }
  }
  return true;
}

let bestWeight = Infinity;
for (const diskLoaders of inputData) {
  if (isValid(diskLoaders)) {
    const weight = calculateWeight(diskLoaders);
    if (weight > inputData.maxRecord && weight < bestWeight) {
      bestWeight = weight;
    }
  }
}

const outputData = { bestWeight: bestWeight !== Infinity ? bestWeight : null };
fs.writeFileSync('output.json', JSON.stringify(outputData));