const shell = require('shelljs')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const rtrim = (s) => String(s).replace(/[\r\n]*$/, '')

function getInputAndExpectation(text = '') {
  let input = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .split(/\n/)
  let expectation = []
  const expLoc = input.indexOf('expected:')
  if (expLoc > -1) {
    expectation = input.slice(expLoc + 1)
    input = input.slice(0, expLoc)
  }
  return { input, expectation }
}

function prettyPrintError(errorText) {
  const lines = (errorText + '').split('\n').filter((l) => l.trim())
  let errorPart = false // the effective error section will be grey
  let afterSocket = false // node internal lines can be omitted
  let color = 'red'
  lines.forEach((line, i) => {
    if (afterSocket) return
    line = line.replace(__dirname, '~')
    if (i === 0) color = 'yellow'
    if (i > 0 && !errorPart) color = 'white'
    if (i > 0 && errorPart) {
      color = 'gray'
    }
    if (/Socket\.<anonymous> \(/.test(line)) {
      afterSocket = true
      return
    }
    if (/Error: /.test(line)) color = 'red'
    console.error(chalk.red('▌') + chalk[color](line))
    if (/Error: /.test(line)) errorPart = true
  })
}

function getFailOrPass(expectation, result) {
  return expectation.length > 0 &&
    rtrim(result) === rtrim(expectation.join('\n'))
    ? chalk.cyan('✔ PASSED')
    : chalk.red('✘ FAILED')
}

async function runner(
  dir = '',
  quiet = false,
  fileWait = 500,
  inputFn,
  printHeader = true
) {
  inputFn = inputFn || 'input.txt'
  const outputFn = inputFn.replace('input', 'output')
  const outputPath = path.resolve(__dirname, `./${dir}/${outputFn}`)
  const inputPath = path.resolve(__dirname, `./${dir}/${inputFn}`)
  let hasErrors = false
  let lastPlainOutput = ''

  if (!fs.existsSync(inputPath)) {
    console.error('input.txt missing')
    process.exit(2)
  }
  if (!quiet && printHeader)
    console.info(chalk.cyan(`\n--=== [ ${dir} ] ===--`))
  let inputText = fs.readFileSync(inputPath, 'utf-8')
  const { input, expectation } = getInputAndExpectation(inputText)

  const nodeBin = process.argv[0] // needed for nvm, plain `node` is not good of course
  const child = spawn(nodeBin, [dir], { env: { OUTPUT_PATH: outputPath } })
  child.stdin.setEncoding('utf-8')
  child.stdout.on('data', (data) => {
    lastPlainOutput = data.toString()
  })
  if (!quiet) child.stdout.pipe(process.stdout)
  child.stderr.on('data', (data) => {
    prettyPrintError(data)
    hasErrors = true
  })
  input.forEach((line) => child.stdin.write(line + '\n'))
  child.stdin.emit('end')
  child.stdin.end()
  await sleep(fileWait)

  if (hasErrors) return false

  // if they used createWriteStream to print the output,
  // then we capture that and print it here finally
  const quietPrint = (failOrPass) =>
    console.info(
      '- ' +
        dir +
        (failOrPass.includes('PASSED') ? chalk.green(' OK') : chalk.red(' NOK'))
    )
  let failOrPass = ''
  if (fs.existsSync(outputPath)) {
    const result = fs.readFileSync(outputPath, 'utf-8')
    failOrPass = getFailOrPass(expectation, result)
    if (quiet) {
      quietPrint(failOrPass)
    } else {
      console.info(chalk.green('\nstream output:'))
      console.info(chalk.greenBright(result) + failOrPass)
    }
  } else if (lastPlainOutput) {
    // otherwise just print the last console.log
    const failOrPass = getFailOrPass(expectation, lastPlainOutput)
    if (quiet) {
      quietPrint(failOrPass)
    } else {
      console.info(chalk.green('\nlast plain output:'))
      console.info(chalk.greenBright(lastPlainOutput) + failOrPass)
    }
  }
  return !failOrPass.includes('FAILED')
}

module.exports = runner

runner.multi = async function (dir, quiet = false) {
  const inputFnsGlob = dir.trimEnd('/') + '/input*.txt'
  const inputFns = Array.from(shell.ls(inputFnsGlob)).map((fn) =>
    path.basename(fn)
  )
  const actions = []
  for (let idx = 0; idx < inputFns.length; idx++) {
    actions.push(runner(dir, quiet, undefined, inputFns[idx], idx === 0))
  }
  return await Promise.all(actions)
}

// ---

if (require.main === module) {
  // run only for cli
  const dir = (process.argv[2] || '').replace(/[/\\]+$/, '')
  const quiet = process.argv.includes('--quiet')
  if (!dir) {
    console.error('dir param missing')
    process.exit(1)
  }
  runner.multi(dir, quiet)
}
