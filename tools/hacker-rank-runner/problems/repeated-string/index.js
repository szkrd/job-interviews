'use strict'

const fs = require('fs')

process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine = 0

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin
})

process.stdin.on('end', function () {
  inputString = inputString.split('\n')

  main()
})

function readLine() {
  return inputString[currentLine++]
}

/*
 * Complete the 'repeatedString' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. LONG_INTEGER n
 */

function repeatedString(s, n) {
  // Write your code here
  const sLen = s.length
  const mod = n % sLen // with sample 0: modulo is 1
  const fullStringCount = Math.floor(n / sLen)
  let countInFull = 0
  let countInTrunc = 0
  // 'aba aba aba a|ba' // with sample 0: cut at 10, 3 full strings
  for (let i = 0; i < sLen; i++) {
    if (s[i] === 'a') {
      countInFull++
      if (i < mod) countInTrunc++
    }
  }
  return fullStringCount * countInFull + countInTrunc
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH)

  const s = readLine()

  const n = parseInt(readLine().trim(), 10)

  const result = repeatedString(s, n)

  ws.write(result + '\n')

  ws.end()
}
