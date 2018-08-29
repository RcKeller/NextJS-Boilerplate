/*
Custom NextJS config:
This allows you to provide extra configuration options
for how React is rendered by the server renderer under the hood
https://nextjs.org/docs/#custom-configuration
*/
const compose = require('next-compose-plugins')

/*
WEBPACK CONFIG
*/
const webpack = (config, options) => {
  // DO NOT REMOVE
  return config
}

module.exports = compose(
  /*
  NEXTJS Plugins
  */
  [
  ],
  /*
  NEXTJS Config
  */
  {
    distDir: 'build',
    webpack
  }
)
