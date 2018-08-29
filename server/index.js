// Core process exception handling
require('./exceptions/process')
const next = require('next')
const express = require('express')
const config = require('../config')
const { Express, HTTP } = require('./setup')
const { API, React } = require('./routes')

const ReactEngine = next({ dev: config.dev })
ReactEngine
  .prepare()
  .then(() => {
    // Initialize express instance and configure parsers / sessionware
    const server = express()
    Express(server, config)

    // Initialize routes - API, client pages, etc
    API(server, config)
    React(server, config, ReactEngine)

    // Serve content via HTTP or HTTPS
    HTTP(server, config)
  })
  .catch(require('./exceptions/next'))

/*
File based on:
https://github.com/zeit/next.js/tree/master/examples/custom-server-express
*/
