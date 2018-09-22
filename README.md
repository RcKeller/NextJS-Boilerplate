# NextJS-Boilerplate

An unopinionated yet extensible starter fullstack boilerplate based on [NextJS 7](https://nextjs.org/blog/next-7/). This provides the build infrastructure and structure necessary to make any kind of React application, with or without an internal API. Testing with [Jest/Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html) and [Bundle Analysis](https://www.npmjs.com/package/webpack-bundle-analyzer) comes built-in.

The server includes a lightweight API controller connected to the [RedHat Security Data API](https://access.redhat.com/documentation/en-us/red_hat_security_data_api/0.1/html/red_hat_security_data_api/). You can easily add your own controllers and database connections using this as a foundation.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Quick Start

The application **REQUIRES** a configuration file located at `config/index.js` in order to run! This file contains top level config information and is omitted from source control. I like this approach because this keeps a record of how environment data is structured and is conflictless when run on a server with multiple applications.

```bash
# Install globals (cross-env is used to support windows, if you use that)
npm i -g cross-env
# Install dependencies
npm install
# Copy the example config file and customize
cp config/index.js.example config/index.js
vim config/index.js
```
```
npm run dev
```

## Build Process

```bash
# Compile the frontend, start the backend
npm run build
npm run start
# Please use forever to run this in prod
# ideally w/ a NGINX reverse proxy as well
```

## Test Suite / Bundle Analyzer

```bash
# Run the whole suite in different modes
npm run test
npm run test:coverage
npm run test:watch
# Or test components individually
npm run test:single "Dashboard"
# Analyze dev & prod bundles
npm run analyze
```

## Application Structure

```raw
.
├── __tests__/                        Test suite using Jest/Enzyme (can also test server)
├── components/                       Reusable stateless components
├── config/
│   ├── index.js                      YOU NEED TO MAKE THIS
│   └── index.js.example              Example application config
├── containers/                       Reusable stateful components
├── pages
│   ├── _app.js                       React UI wrapper, equivalent to "App.js" in CRA
│   ├── _document.js                  NextJS wrapper, provides raw HTML used in SSR
│   └── *                             Page components, routing is based on file tree
├── server/
│   ├── controllers/                  Controllers for APIs, services etc
│   ├── exceptions/                   Exception handling for low level errors, process hardening
│   ├── index.js/                     Server entry point
│   ├── middleware/                   Middlewares used en-masse by routes
│   ├── routes/                       Route definitions
│   └── setup/                        Initialization functions for your express instance
├── static/                           Static content to serve
├── styles/                           SASS styles
├── tools/                            Common client & server side tools
├── enums/                            Enums and PropTypes
├── .babelrc                          Babel 7 feature declaration
├── .eslintc                          Linter config (defaults to standard style)
├── jest.config.js                    Test environment config
├── jest.setup.js                     Bootstrapping script for Jest/Enzyme
├── next.config.js                    NextJS / Webpack configuration
├── nodemon.json                      Nodemon config (for backend reloading)
└── package.json                      Application manifest
```

### Build Infrastructure

[NextJS](https://nextjs.org) is used as boilerplate for our webpack config, SSR setup, and paramaterized routing. This includes hot-reloading for the client side, but we enable it for the server by using [Nodemon](https://github.com/remy/nodemon) to monitor changes to the `server/`. The [configuration file](next.js.config) is fairly minimal, adding the necessary loaders to support SASS, fonts/images, and aliases like `components` and `enums` to replace relative imports on the client side.

The UI makes heavy use of [React-MD](https://react-md.mlaursen.com), an unopinionated SASS-based UI library. It's lighter and more extensible than Material-UI, but lacks the controlled features, events and API that Material-UI often provides with its stateful components. As a result, much of the code here handles low level operations like event handling, form data processing, etc.

Every `page/` component has an extra lifecycle method called `getInitialProps`. This is an async function that runs universally (both client and server) and is a blocking event that collects data before the page is rendered. This pattern allows us to continue writing declarative react without having to test the truthiness of our props constantly, because we can now assume the data has loaded. If the page fails to load API data, the user is redirected before anything renders and errors out. I've included error boundaries just in case, though (React 16's version of a try/catch).

## API

### Vulnerabilities and Exposures
**Source**: [RedHat Security Data API](https://access.redhat.com/documentation/en-us/red_hat_security_data_api/0.1/html/red_hat_security_data_api/)

This API allows the server and users alike to request information about any outstanding vulnerability that has been published (CVE or CVRF). Records can be queried in mass, or individually given a CVE ID.

Examples:
```
http://localhost:3000/api/v1/cve
http://localhost:3000/api/v1/cve/CVE-2016-3706
```

## Production Considerations

- Self-signed HTTPS certificates are included, but in production, you should use a cert authority (shout-out to LetsEncrypt) or, even better, an [NGINX reverse-proxy](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
- [Responses are cached](/server/middleware/Cache.js) very aggressively so we can be kind to RedHat. Be sure to re-evaluate the usage of a cache for your use case, since it could lead to stale reads.
- Add a state-management solution like MobX or Redux, depending on how much structure you want. Consider making a "Page" wrapper component that includes your provider and avoid using it in [_app.js](/pages/_app.js) - this will minimize your bundle size.
- Paginate your dashboards and other data-rich views, this was not included here because your solution will be contingent on your choice in DB.
