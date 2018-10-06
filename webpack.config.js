/*
WEBPACK CONFIG
- This function returns a basic webpack config included by NextJS
- You can add extra settings, plugins, rules etc to this.
*/
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

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
