const express = require('express')
const https = require('https')
const http = require('http')

const HTTP = (server, config) => {
  const { dev, ports } = config
  const port = dev ? ports.dev : ports.http
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`HTTP Ready: http://localhost:${port}`)
  })
}

/*
Node-based HTTPS Strategy
NOTE: This requires signed HTTP keys/certs
We're using basic self-signed certs as a default, expect that to error out in prod
unless you sign your own

NOTE: Most developers use a reverse proxy (e.g. NGINX) for performance instead of this method
*/
const HTTPS = (server, config) => {
  const { ports } = config
  const { key, cert } = require('openssl-self-signed-certificate')

  // HTTPS
  https
    .createServer({ key, cert }, server)
    .listen(ports.https, err => {
      if (err) throw err
      console.log(`> HTTPS Ready on ${ports.https}`)
    })

  // HTTP Redirect / reverse proxy
  // (please use NGINX for this in prod, more performant and secure)
  const redirectServer = express()
  redirectServer.get('*', (req, res) => {
    res.writeHead(302, { Location: `https://${req.headers.host}${req.url}` })
    res.end()
  })
  http
    .createServer(redirectServer)
    .listen(ports.http, err => {
      if (err) throw err
      console.log(`> HTTP Redirect Enabled: ${ports.http} >>> ${ports.https}`)
    })
}

/*
EXPORTS:
*/
// module.exports = process.env.NODE_ENV === 'development' ? HTTP : HTTPS
module.exports = HTTP
