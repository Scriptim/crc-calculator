const crc = (data, generator) => {
  const crc = {
    data,
    generator,
    divisionSteps: []
  }

  const degree = generator.length - 1

  let remainder = data + '0'.repeat(degree)
  let indent = 0

  const step = str => {
    crc.divisionSteps.push(' '.repeat(indent) + str)
  }

  step(`${remainder} : ${generator}`)

  indent = remainder.indexOf('1')
  remainder = remainder.substring(indent)

  while (remainder.length >= generator.length) {
    step(generator)

    const minuend = parseInt(remainder.substring(0, generator.length), 2)
    const subtrahend = parseInt(generator, 2)
    const difference = (minuend ^ subtrahend).toString(2).padStart(generator.length, '0')

    remainder = difference + remainder.substring(generator.length)
    step('-'.repeat(generator.length))
    step(remainder)

    const index = remainder.includes('1') ? remainder.indexOf('1') : generator.length
    remainder = remainder.substring(index)
    indent += index
  }

  crc.remainder = remainder
  crc.codeword = data + remainder

  return crc
}

module.exports = { crc }
