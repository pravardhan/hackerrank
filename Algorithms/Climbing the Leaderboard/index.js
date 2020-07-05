'use strict';

const fs = require('fs');
const path = require('path');

// process.stdin.resume();
// process.stdin.setEncoding('utf-8');

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

function findLeaderBoardPosition(scores=[], aliceScore, start, end) {
  const startScore = scores[start];
  const endScore = scores[end];
  
  const midIndex = Math.floor(start + (end-start)/2);
  const midScore = scores[midIndex];
  
//   console.log(startScore, endScore, start, end, midIndex, midScore);
  
  if(aliceScore === startScore) {
    return start + 1;
  } else if(aliceScore === endScore) {
    return end + 1;
  }
  else if(aliceScore > startScore || (start === midIndex && aliceScore > midScore)) {
    return start + 1;
  } 
  else if(aliceScore < endScore || (start === midIndex && aliceScore < endScore)) {
    return end + 2;
  }
  else if(start === end || end < start) {
     return start + 1;
  }
  else if(aliceScore === midScore) {
    return midIndex + 1;
  } else if(start === midIndex && aliceScore > endScore) {
    return end + 1;
  }
  else if(aliceScore > midScore) {
    return findLeaderBoardPosition(scores, aliceScore, start, midIndex);
  }
  else if(aliceScore < midScore) {
    return findLeaderBoardPosition(scores, aliceScore, midIndex, end);
  }
}
// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    try {
        const leaderBoardUpdations = [];
        const uniqueScores = Array.from(new Set(scores));
        let previousScoreIndex = uniqueScores.length - 1;;
        return alice.map((score)=> {
            const leaderboardIndex = findLeaderBoardPosition(uniqueScores, score, 0, previousScoreIndex );
            previousScoreIndex = uniqueScores.length - 1;
            return leaderboardIndex;
        })
    } catch(e) {
        return 1;
    }
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const ws = fs.createWriteStream(path.join(__dirname, 'output1.txt'));


    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    console.log("RESULT", result);

    ws.write(result.join("\n") + "\n");

    ws.end();
}