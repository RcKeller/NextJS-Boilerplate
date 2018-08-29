// Core process exception handling
require('./exceptions/process')
const next = require('next')
const express = require('express')
const { dev, ports } = require('../config')

const ReactEngine = next({ dev })
ReactEngine
  .prepare()
  .then(() => {
    // Initialize express instance and configure parsers / sessionware
    const server = express()
    const handle = ReactEngine.getRequestHandler()
    const port = dev ? ports.dev : ports.http

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(require('./exceptions/next'))

/*
File based on:
https://github.com/zeit/next.js/tree/master/examples/custom-server-express
*/
