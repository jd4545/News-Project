# Northcoders News API

As part of the Nortcoders 13-week programme, I was set the task to create a backend api for a news app.

You can find the hosted version [here](https://jdsnewsapp.herokuapp.com/api)

## Project highlights:

- Designed using Javascript, making requests to a PSQL database.
- Created using test-driven development (TDD) using Jest.
- Organised along the Model-view-controller (MVC) software design pattern.
- Uses express to interface with SQL for GET/POST/PATCH/DELETE requests
- Full list of endpoints at /api

## Instructions for use:

1. Clone the repository
2. Install dependencies: `npm i`
3. As .env files are not uploaded to github (because they are in .gitignore), create your own versions of these for each database, each pointing to the respective database:
   `PGDATABASE=nc_news_test` in .env.test.
   `PGDATABASE=nc_news` in .env.development.
   Locate these in the root directory of the repository.
4. Seed local database: `npm run setup-dbs`
5. Run tests: `npm test`
6. start server with `npm start`

## Features to be added:

- Further endpoints e.g. POST articles, topics
- Pagination
