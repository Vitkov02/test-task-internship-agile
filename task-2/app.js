const fs = require('fs');
const inputData = JSON.parse(fs.readFileSync('input.json'));

let a = inputData.arr[0];
let b = inputData.arr[0];

while(true) {
    a = inputData.arr[a];
    b = inputData.arr[inputData.arr[b]];
    if(a === b) {
        break;
    }
}

let ptr1 = inputData.arr[0];
let ptr2 = a;
while(ptr1 !== ptr2) {
    ptr1 = inputData.arr[ptr1];
    ptr2 = inputData.arr[ptr2];
}

const result = {
    rptElement: ptr1
};
fs.writeFileSync('output.json', JSON.stringify(result));