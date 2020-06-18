# React Client Seed

A **lean** template that consists of the minimal essential elements that are required to start building a React:

* a typcial project layout structure
* babel setup and configuration
* webpack setup and configuration
* eslint setup and configuration
* the main React components to get started

---

### Install & Run

Follow the following steps to get development environment running.

* Clone from GitHub

  ```bash
  git clone git@github.com:playbuzz/react-client-seed.git
  ```

* Install modules

   ```bash
   npm install
   ```
* Update deployment script

1. deploy.js - update `deploymentPath` variable
2. deploy.js - update `configKey` variable

* Update Jenjinsfile -  update `channel` variable to your slack channel anme

#### NPM scripts 
* Run project for development.

   ```bash
   npm start
   ```

* Delete build folder, using with `prebuild` hook.

   ```bash
   npm run clean
   ```

* Build appliction for production.
   ```bash
   npm run build
   ```

* Run linting script, also can run with `:fix` flag for autofixing.
   ```bash
   npm run lint
   ```
    ```bash
   npm run lint:fix
   ```

* Analyze application With BundleAnalayzer plugin
   ```bash
   npm run analyze
   ```

#### TODO

| Task                    | Status           
| ------------------------|:------------------:| 
| Add deploy scripts      | ✅
