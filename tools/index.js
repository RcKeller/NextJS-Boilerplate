/*
TOOLS - reusable utilities.
Important notes:
- This isn't called "util" because that's a built-in npm package.
- These are in commonjs format (using moule.exports and require() syntax)
  because they may be used on the server side, and import/export
  are not actual keywords in NodeJS (yet)
*/
module.exports = {
  api: require('./api'),
  API: require('./api'),
  format: require('./format')
}
