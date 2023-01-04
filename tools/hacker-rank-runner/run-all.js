const chalk = require('chalk')
const shell = require('shelljs')
const dirs = shell.ls('problems')
const runner = require('./runner')

Promise.all(dirs.map((dir) => runner.multi(`problems/${dir}`, true))).then(
  (results) => {
    results = results.flat()
    const passed = results.filter((x) => x).length
    const failed = results.length - passed
    if (failed) process.exitCode = 1
    console.info(`\npassed: ${passed}\nfailed: ${failed}`)
  }
)
