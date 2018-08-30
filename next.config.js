const path = require('path')

/*
WEBPACK CONFIG
*/
const webpack = (config, options) => {
  /*
  ALIASES:
  Allow you to import common folders as if they are modules, e.g.
  import { api } from 'tools'
  NOTE: This is only for the frontend
  */
  Object.assign(config.resolve.alias, {
    config: path.resolve(__dirname, 'config/'),
    // Named tools because 'util' is a native package
    tools: path.resolve(__dirname, 'tools/'),
    containers: path.resolve(__dirname, 'containers/'),
    components: path.resolve(__dirname, 'components/'),
    // Named 'types' because 'constant' is a deprecated node API
    types: path.resolve(__dirname, 'types/'),
    styles: path.resolve(__dirname, 'styles/')
  })

  /*
  FILE / ASSET IMPORTS
  Allows you to specify fonts, icons etc via CSS
  */
  config.module.rules.push({
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 100000
      }
    }
  })

  // DO NOT REMOVE
  return config
}

/*
Custom NextJS config:
This allows you to provide extra configuration options
for how React is rendered by the server renderer under the hood
https://nextjs.org/docs/#custom-configuration
*/
const compose = require('next-compose-plugins')
const SASS = require('@zeit/next-sass')

module.exports = compose(
  /*
  NEXTJS Plugins
  */
  [
    SASS
  ],
  /*
  NEXTJS Config
  */
  {
    distDir: 'build',
    webpack
  }
)
