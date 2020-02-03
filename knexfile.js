// ability to read from the environment and connecting dynamically
const pg = require('pg'); // postgres client
require('dotenv').config(); // read .env file

const pgUser = process.env.PG_USER;
const pgDb = process.env.PG_DB;

// Postgres configurations
// Command for running postgres locally:
// knex migrate:latest --env production
// knex seed:run --env production

const localPgConnection = `postgres://${pgUser}@localhost/${pgDb}`;

//DATABASE_URL config var is added to your Heroku app’s configuration. This contains the URL your app used to access the database.
const dbConnection = process.env.DATABASE_URL + '?ssl=true';

module.exports = {
  development: {
    client: 'pg', // npm i pg
    connection: localPgConnection,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done); //enforce FK
      }
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  production: {
    client: 'pg', // npm i pg
    connection: dbConnection,
    pool: {
      // config connections between app and server
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
