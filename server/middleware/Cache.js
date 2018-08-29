const cache = require('apicache').middleware

/*
Caches successful request data for 5 minutes.
Be nice to your third party API!
*/
module.exports = class Errors {
  constructor (router) {
    const interval = '5 minutes'
    console.warn(`Initializing Cache: ${interval}`)
    router.get('*', cache('5 minutes', this.isStatus200))
  }
  isStatus200 (req, res) {
    return res.statusCode === 200
  }
}
