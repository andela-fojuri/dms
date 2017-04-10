[![Build Status](https://travis-ci.org/andela-fojuri/dms.svg?branch=develop)](https://travis-ci.org/andela-fojuri/dms)
[![Test Coverage](https://codeclimate.com/github/andela-fojuri/dms/badges/coverage.svg)](https://codeclimate.com/github/andela-fojuri/dms/coverage)

# Document Management System 

Document Management System provides a restful API and friend users interface for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT. The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

## Development
This application was developed using [NodeJs](https://nodejs.org) with [React Redux](http://redux.js.org/docs/basics/UsageWithReact.html) for frontend and [express](https://expressjs.com/) for routing. Postgres was used for persisting data with [Sequelize](https://sequelizejs.org) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)

## Application Features
###### User Authentication
Users are authenticated and validated us JWT web token. Generating tokens on signup and login ensures documents and API endpoints are protected.

###### Document Management
*   Create an account
*   Login with your credentials
*   Create new document with specifying document title, content and document access
*   Edit Documents
*   Delete documents
*   View public documents created by other users.
*   View documents created with access level set as `role` if on same role level.
*   Search for specific documents.
*   Logout

-   In addition to the general user functions, an admin user can:
    -   View all users.
    -   View all created documents.
    -   Delete any user.
    -   Update any user's record.
    -   Create a new role.
    -   View all created roles.
    -   Search for any user.
    -   Search for any Document

## Installation
-   Ensure that you have NodeJs and Postgres installed on your machine
-   Clone the repository `$ git clone https://github.com/andela-fojuri/dms.git`
-   Change into the directory `$ cd /dms`
-   Install all required dependencies with `$ npm install`

## Usage
-   Run DB Migrate command with  `sequelize  db:migrate`
-   Seed you DB by running this command `npm run db:test:seed`, this seeds Admin Role and Regular Role.
-   Run `npm start` to start the application on development environment

## Testing
-   Run DB migrate command with `npm run db:migrate:test`.
-   Run Test `npm test`
-   You can undo your migrations by running this command `npm run db:migrate:test:undo`.

` I strongly suggest using separate DB for testing and development `
## API Documentation Link
- [visit] (https://andela-fojuri.github.io/dms/)

