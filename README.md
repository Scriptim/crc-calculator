# CRC Calculator

Website and CLI for error detection with Cyclic Redundancy Checks.

<https://scriptim.github.io/crc-calculator/>

## Usage

    $ node index.js --help
    CRC Calculator

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
      -l --generators  Show a list of predefined CRC polynomials.

### Examples

#### Default Usage

    $ node index.js 101001011 1010
    101001011000 : 1010
    1010
    ----
    000001011000
        1010
        ----
        0001000
            1010
            ----
            0010

    101001011010

#### Check a codeword

    $ node index.js 101001011010 1010 --check
    101001011010 : 1010
    1010
    ----
    000001011010
        1010
        ----
        0001010
            1010
            ----
            0000

    Error: false

#### Use a predefined generator polynomial

    $ node index.js 101001011 --generator crc-1
    1010010110 : 11
    11
    --
    0110010110
    11
    --
    000010110
        11
        --
        01110
          11
          --
          0010
            11
            --
            01

    1010010111
