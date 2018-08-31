# HR-dashboard

Coding challenge completed as part of my candidacy with an unnamed startup. This is a react-based application that interacts with a basic API to demonstrate simple CRUD operations. When my candidacy ends I will turn this into a standalone boilerplate

Key requirements paraphrased:
- Dashboard view with a datatable supporting keyboard navigation, sorting and filtering
- Profile view that allows users to cycle through records with arrow keys
- Onboarding page for creating new employee records

The application should be mobile responsive and "production ready". The deadline is 1 week, but I had limited time to work on this due to other interviews.

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

## Application Structure

```raw
.
├── components/                       Reusable stateless components
├── config/
│   ├── index.js                      YOU NEED TO MAKE THIS
│   └── index.js.example              Example application config
├── containers/                       Reusable stateful components
├── next.config.js                    NextJS / Webpack configuration
├── nodemon.json                      Nodemon config (for backend reloading)
├── package.json                      Application manifest
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
└── types/                            Enums and PropTypes
```

### Build Infrastructure

[NextJS](https://nextjs.org) is used as boilerplate for our webpack config, SSR setup, and paramaterized routing. This includes hot-reloading for the client side, but we enable it for the server by using [Nodemon](https://github.com/remy/nodemon) to monitor changes to the `server/`. The [configuration file](next.js.config) is fairly minimal, adding the necessary loaders to support SASS, fonts/images, and aliases like `components` and `tools` to replace relative imports on the client side.

The UI makes heavy use of [React-MD](https://react-md.mlaursen.com), an unopinionated SASS-based UI library. It's lighter and more extensible than Material-UI, but lacks the controlled features, events and API that Material-UI often provides with its stateful components. As a result, much of the code here handles low level operations like event handling, form data processing, etc.
[Ag-grid](https://www.ag-grid.com/react-getting-started/)'s react variant is being used for datatables due to its high performance and feature-complete API. Even though this is commercialized, it still offers more features than other libraries like adazzle's react-data-grid or react-bootstrap-table. The fact that it isn't entirely based on react actual works in our favor because in the future more advanced operations like lazy loading pagination are easier to incorporate.

Every `page/` component has an extra lifecycle method called `getInitialProps`. This is an async function that runs universally (both client and server) and is a blocking event that collects data before the page is rendered. This pattern allows us to continue writing declarative react without having to test the truthiness of our props constantly, because we can now assume the data has loaded. If the page fails to load API data, the user is redirected before anything renders and errors out. I've included error boundaries just in case, though (React 16's version of a try/catch).

### Employee API

I've made an express API for interacting with our third party API. Why?
- Queries can be cached and preloaded in pages that are rendered by the server, skipping some large client side API calls
- The cached results from paginated APIs could be delivered via a stream over a websocket, lowering TTL (TODO)
- The data has to be transformed going to/from the API to ensure integrity and typecheck fields (e.g. salary should be a float, not string)
- Our server should account for outages and slowdowns (the HR API seems to be rate limited).

The express API operates in a fairly similar fashion, standard REST.

```raw
http://localhost:3000/api/v1/employee/
http://localhost:3000/api/v1/employee/<id>
```

## TODO

I've run out of time for this exercise, but would be glad to dedicate more to the final features if I do move forward in the process.

- Pagination and data streaming for `/employee/dashboard`.
- Jest/Enzyme testing of UI components.
- Implement typechecking solutions (Flow / Typescript)
- State management and client-side caching (e.g. Redux and Redux-Query)
