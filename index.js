#!/usr/bin/env node

const { crc, crcPolynomials } = require('./crc.js')

const args = require('minimist')(process.argv.slice(2), {
  string: [
    '_',
    'generator'
  ],
  boolean: [
    'help',
    'check',
    'version',
    'short',
    'generators'
  ],
  alias: {
    g: 'generator',
    c: 'check',
    h: 'help',
    v: 'version',
    s: 'short',
    l: 'generators'
  },
  default: {
    generator: null,
    check: false,
    help: false,
    version: false,
    short: false,
    generators: false
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
  node index.js --help | --version | --generators
  node index.js <data> (<generator> | --generator <generator name>) [--check] [--short]

Positional Arguments:
  data       Binary data string.
  generator  Binary string encoding the CRC polynomial.

Options:
  -h --help        Show this help page.
  -v --version     Show version.
  -s --short       Only show the resulting codeword.
  -c --check       Check a codeword for errors.
  -g --generator   Name of a predefined CRC polynomial.
  -l --generators  Show a list of predefined CRC polynomials.`

if (args.help) {
  console.log(usageInfo)
  process.exit(0)
}

if (args.version) {
  console.log(require('./package.json').version)
  process.exit(0)
}

if (args.generators) {
  console.log(Object.keys(crcPolynomials).join(', '))
  process.exit(0)
}

if (!(args._.length === 2 && args.generator === null ||
  args._.length === 1 && args.generator !== null)) {
  console.error(usageInfo)
  process.exit(1)
}

if (args.generator !== null) {
  if (!Object.keys(crcPolynomials).includes(args.generator.toLowerCase())) {
    console.error('Unknown generator name. Use --generators for a list of generators.')
    process.exit(1)
  }
  args._.push(crcPolynomials[args.generator.toLowerCase()])
}

if (args._.find(arg => /^[^01]$/.test(arg)) !== undefined) {
  console.error('Positional arguments have to be binary strings.')
  process.exit(1)
}

if (args._[1].startsWith('0')) {
  console.error('Generator polynomial must not start with zero.')
  process.exit(1)
}

const encoded = crc(args._[0], args._[1], args.check)

if (!args.short) {
  console.log(`${encoded.divisionSteps.join('\n')}\n`)
}

if (args.check) {
  console.log(`Error: ${encoded.error}`)
} else {
  console.log(encoded.codeword)
}
