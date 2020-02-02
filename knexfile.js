// ability to read from the environment and connecting dynamically
const pg = require('pg'); // postgres client
require('dotenv').config(); // read .env file

const pgUser = process.env.PG_USER;
const pgDb = process.env.PG_DB;

// Postgres configurations
// Command for running postgres locally:
// knex migrate:latest --env production
// knex seed:run --env production

// postgres connection
const prodConnection = `postgres://${pgUser}@localhost/${pgDb}`;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/hobbits.db3'
    },
    useNullAsDefault: true,
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
    connection: prodConnection,
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
