'use strict';

const fs = require('fs');
const path = require('path');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });

// process.stdin.on('end', _ => {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));

//     main();
// });

const reader = fs.createReadStream(path.join(__dirname, 'testcase1.txt'));

reader.on('data', function (chunk) { 
    inputString += chunk.toString();
});
reader.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the encryption function below.
function encryption(s) {
    const str = s.replace(/ /g,'');
    const length = str.length;
    const sqrt = Math.sqrt(length);

    const col = Math.ceil(sqrt);

    const returnArr = [];
    for(let i=0; i < col; i++) {
        let newWord = str[i];
        for(let j=i+col;j<length;j+=col) {
            newWord += str[j] || '';
        }
        returnArr.push(newWord);
    }
    
    return returnArr.join(" ");
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const ws = fs.createWriteStream(path.join(__dirname, 'output1.txt'));
    const s = readLine();
    let result = encryption(s);
    
    ws.write(result + "\n");
    ws.end();
}
