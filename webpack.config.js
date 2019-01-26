/*
WEBPACK CONFIG
- This function returns a basic webpack config included by NextJS
- You can add extra settings, plugins, rules etc to this.
*/
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const dir = (folder) => path.resolve(__dirname, folder)

module.exports = (config, options) => {
  const { ANALYZE } = process.env
  const { isServer } = options
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
    pages: dir('pages/'),
    containers: dir('containers/'),
    components: dir('components/'),
    styles: dir('styles/'),
    enums: dir('enums/'),
    /*
    UNIVERSAL
    CommonJS format (module.exports/require)
    */
    config: dir('config/'),
    tools: dir('tools/') //  Named because 'util' is reserved
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
  /*
  ANALYZE:
  Add the webpack bundle analyzer
  */
  if (ANALYZE) {
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: isServer ? 8888 : 8889,
      openAnalyzer: true
    }))
  }
  // DO NOT REMOVE
  return config
}
