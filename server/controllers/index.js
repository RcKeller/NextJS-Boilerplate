/*
Controllers array
EAch API has sub-apis e.g. ChicagoHR's Employee API.
We're using the spread operator here to make a giant array of controllers
E.g. [chichago-employees, chicago-payroll, ...]
*/
module.exports = [
  ...require('./ChicagoHR')
]
