const fs = require('fs');
const inputData = JSON.parse(fs.readFileSync('input.json'));
const availableSizes = Object.keys(inputData.tshirts);
const tshirtCount = {};

availableSizes.forEach(size => {
  tshirtCount[size] = inputData.tshirts[size];
});

const participants = inputData.participants.slice();

const tshirtAssignments = [];

while (participants.length > 0) {
  let assignedTshirt = false;
  let i = 0;
  while (i < participants.length && !assignedTshirt) {
    const participant = participants[i];
    const requiredSize = participant.size;
    const requiredSizeIndex = availableSizes.indexOf(requiredSize);
    let adjacentSizes = [];
    if (requiredSizeIndex > 0) {
      adjacentSizes.push(availableSizes[requiredSizeIndex - 1]);
    }
    if (requiredSizeIndex < availableSizes.length - 1) {
      adjacentSizes.push(availableSizes[requiredSizeIndex + 1]);
    }
    for (const adjacentSize of adjacentSizes) {
      if (tshirtCount[adjacentSize] > 0) {
        tshirtAssignments.push({
          participant: participant.name,
          size: adjacentSize
        });
        tshirtCount[adjacentSize]--;
        participants.splice(i, 1);
        assignedTshirt = true;
        break;
      }
    }
    i++;
  }
  if (!assignedTshirt) {
    break;
  }
}

const outputData = {
  possible: participants.length === 0,
  tshirts: tshirtAssignments
};
fs.writeFileSync('output.json', JSON.stringify(outputData));