//  Avoid importing the full lodash bundle
const startCase = require('lodash/startCase')
const toLower = require('lodash/toLower')

// Title Case
module.exports.titleCase = (str = '') => startCase(toLower(str))

//  USD: $1,234,567
module.exports.USD = (num = 0) => num.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})
