
/*
Custom NextJS config:
This allows you to provide extra configuration options
for how React is rendered by the server renderer under the hood
https://nextjs.org/docs/#custom-configuration
*/
const webpack = require('./webpack.config')
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
