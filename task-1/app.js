const fs = require('fs');
const inputData = JSON.parse(fs.readFileSync('input.json'));

function transformNumber(firstNumber) {
  const doubleNumber = firstNumber * 2;
  const appendOne = Number(firstNumber.toString() + '1');

  if(doubleNumber === inputData.secondNumber) {
    return true;
  }

  if(appendOne === inputData.secondNumber) {
    return true;
  }

  return false;
}

const canTransform = transformNumber(inputData.firstNumber);

fs.writeFileSync('output.json', JSON.stringify({ canTransform }));