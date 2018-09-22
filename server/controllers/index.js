/*
Controllers array
EAch API has sub-apis e.g. RedHat's Vulnerability API.
We're using the spread operator here to make a giant array of controllers
E.g. [RedHat-CVEs, RedHat-CVRFs, ...]
*/
module.exports = [
  ...require('./RedHat')
]
