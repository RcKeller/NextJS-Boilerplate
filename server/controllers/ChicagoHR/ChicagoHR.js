const autobind = require('auto-bind')

/*
BASE CLASS: Chicago HR Database
This serves as the base configuration for querying the API
https://dt-interviews.appspot.com/
*/
module.exports = class ChicagoHR {
  constructor () {
    // FYI you can't use static props in an instance of a class. Just ES weirdness.
    this.base = 'https://dt-interviews.appspot.com'
    // Controller routes
    autobind(this)
  }
}
