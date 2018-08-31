const Router = require('next/router') 

/*
Isomorphic redirect
getInitialProps can run both in a client and server context
This tests the environment and redirects a client accordingly
*/
module.exports.redirect = (location, res, err) => {
  // Server-side requests
  if (res) {
    res.writeHead(302, { Location: location })  // Case sensitive
    res.end()
  // Client-side requests
  } else if (Router) {
    Router.push(location)
  }
  // TODO: Add toasts / flashes
  // Log errors
  console.error(err)
}
