const { Router } = require('express')
const controllers = require('../../controllers')
const middleware = require('../../middleware')

/*
API ROUTES
These typically consume third party APIS and serve them
securely to a same-origin source for security purposes
*/
module.exports = (server, config) => {
  const { api } = config
  const { prefix, version } = api

  // Define the API routes and controllers with their own middlewares
  const API = new Router()
  middleware.forEach(Middleware => new Middleware(API))
  controllers.forEach(Controller => new Controller(API))
  // 404 Route for any mismatched routes within /api/<version>/
  API.get('*', (req, res) => res.status(404).json(null))

  // Prefix the API's routes
  server.use(`/${prefix}/${version}`, API)
}
