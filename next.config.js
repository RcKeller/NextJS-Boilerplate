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
    tools: path.resolve(__dirname, 'tools/'),
    containers: path.resolve(__dirname, 'containers/'),
    components: path.resolve(__dirname, 'components/'),
    constants: path.resolve(__dirname, 'constants/'),
    styles: path.resolve(__dirname, 'styles/')
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
