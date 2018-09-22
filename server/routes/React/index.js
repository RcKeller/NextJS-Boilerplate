/*
REACT ROUTES
NOTE: These are only the custom ones.
Others are made automatically based on filename when using handle()
e.g. pages/dashboard.js -> /dashboard
*/
module.exports = (server, config, engine) => {
  const handle = engine.getRequestHandler()
  /*
  Next.JS SSR handler
  https://github.com/mluberry/nextjs-express
  */
  server.get('*', (req, res) => handle(req, res))
}
