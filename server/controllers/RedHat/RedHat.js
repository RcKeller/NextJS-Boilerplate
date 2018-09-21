const autobind = require('auto-bind')

/*
BASE CLASS: RedHat API
This serves as the base configuration for querying the API
https://access.redhat.com/documentation/en-us/red_hat_security_data_api/0.1/html/red_hat_security_data_api/
*/
module.exports = class RedHat {
  constructor () {
    this.base = 'https://access.redhat.com/labs/securitydataapi'
    autobind(this)
  }
}
