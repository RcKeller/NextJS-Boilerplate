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
    /*
    CLIENT-SIDE
    ES Module format (import/export syntax)
    */
    pages: path.resolve(__dirname, 'pages/'),
    containers: path.resolve(__dirname, 'containers/'),
    components: path.resolve(__dirname, 'components/'),
    styles: path.resolve(__dirname, 'styles/'),
    enums: path.resolve(__dirname, 'enums/'),
    /*
    UNIVERSAL
    CommonJS format (module.exports/require)
    */
    config: path.resolve(__dirname, 'config/'),
    tools: path.resolve(__dirname, 'tools/') //  Named because 'util' is reserved
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
const CSS = require('@zeit/next-css')
const SASS = require('@zeit/next-sass')

module.exports = compose(
  /*
  NEXTJS Plugins
  */
  [
    CSS,
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
