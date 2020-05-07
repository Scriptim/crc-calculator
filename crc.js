const crc = (data, generator, check) => {
  const crc = {
    data,
    generator,
    divisionSteps: []
  }

  const degree = generator.length - 1

  let remainder = check === true ? data : data + '0'.repeat(degree)
  let indent = 0

  const step = str => {
    crc.divisionSteps.push(' '.repeat(indent) + str)
  }

  step(`${remainder} : ${generator}`)

  indent = remainder.indexOf('1')
  remainder = remainder.substring(indent)

  while (remainder.length >= generator.length) {
    step(generator)

    const difference = generator.split('')
      .map((val, i) => val === remainder[i] ? '0' : '1').join('')
      .toString(2).padStart(generator.length, '0')

    remainder = difference + remainder.substring(generator.length)
    step('-'.repeat(generator.length))
    step(remainder)

    const index = remainder.includes('1') ? remainder.indexOf('1') : generator.length
    remainder = remainder.substring(index)
    indent += index
  }

  crc.remainder = remainder

  if (check === true) {
    crc.error = remainder.includes('1')
  } else {
    crc.codeword = data + remainder.padStart(degree, '0')
  }

  return crc
}

const crcPolynomials = {
  'crc-1': '11',
  'crc-3-gsm': '1011',
  'crc-4-itu': '10011',
  'crc-5-epc': '101001',
  'crc-8': '100000111',
  'crc-10': '11000110011',
  'crc-12': '1100000001111',
  'crc-16': '11000000000000101',
  'crc-ccitt': '10001000000100001',
  'crc-32': '100000100110000010001110110110111'
}

module.exports = { crc, crcPolynomials }
