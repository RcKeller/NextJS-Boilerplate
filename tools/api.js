const config = require('config')

/*
API:
Calculates the URI to hit for the internal API
This is determined by the type of request (server or client)
and config data (API prefix and version)
*/
module.exports = (req) => req && req.get
  ? `${req.protocol}://${req.get('Host')}/${config.api.prefix}/v${config.api.version}`
  : `/${config.api.prefix}/v${config.api.version}`
