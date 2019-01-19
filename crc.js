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

module.exports = { crc }
