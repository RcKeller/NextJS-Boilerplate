// Core process exception handling
require('./exceptions/process')
const next = require('next')
const express = require('express')
const config = require('../config')
const { Express, HTTP } = require('./setup')
const { API, React, Socket } = require('./routes')

const ReactEngine = next({ dev: config.dev })
ReactEngine
  .prepare()
  .then(() => {
    // Initialize express instance and configure parsers / sessionware
    const app = express()
    Express(app, config)


    // Serve content via HTTP or HTTPS
    // Return that server instance so websockets can be set up
    const server = HTTP(app, config)

    // Initialize routes - API, client pages, etc
    Socket(server, config)
    API(app, config)
    React(app, config, ReactEngine)
  })
  .catch(require('./exceptions/next'))

/*
File based on:
https://github.com/zeit/next.js/tree/master/examples/custom-server-express
*/
