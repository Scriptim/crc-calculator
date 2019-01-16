#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2), {
  string: [
    '_',
    'generator'
  ],
  boolean: [
    'help',
    'version',
    'concise'
  ],
  alias: {
    g: 'generator',
    h: 'help',
    v: 'version',
    c: 'concise'
  },
  default: {
    generator: null,
    help: false,
    version: false,
    concise: false
  },
  unknown: arg => {
    if (arg.startsWith('-')) {
      console.error(`Unknown option '${arg}'`)
      process.exit(1)
    }
  }
})

const usageInfo = `CRC Calculator

Usage:
  node index.js --help | --version
  node index.js <data> (<generator> | --generator <generator name>) [--concise]

Positional Arguments:
  data       Binary data string.
  generator  Binary string encoding the CRC polynomial.

Options:
  -h --help       Show this help page.
  -v --version    Show version.
  -c --concise    Only show the resulting codeword.
  -g --generator  Name of a predefined CRC polynomial.`

if (args.help) {
  console.log(usageInfo)
  process.exit(0)
}

if (args.version) {
  console.log(require('./package.json').version)
  process.exit(0)
}

if (!(args._.length === 2 && args.generator === null ||
  args._.length === 1 && args.generator !== null)) {
  console.error(usageInfo)
  process.exit(1)
}

// TODO:
if (args.generator !== null) {
  console.error('--generator option is not implemented yet')
  process.exit(1)
}

if (args._.find(arg => /^[^01]$/.test(arg)) !== undefined) {
  console.error('Positional arguments have to be binary strings.')
  process.exit(1)
}

const crc = require('./crc.js')
const encoded = crc.crc(args._[0], args._[1])

if (args.concise) {
  console.log(encoded.codeword)
} else {
  console.log(`${encoded.divisionSteps.join('\n')}\n\n${encoded.codeword}`)
}
