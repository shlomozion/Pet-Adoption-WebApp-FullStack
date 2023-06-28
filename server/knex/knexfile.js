// Update with your config settings.
const path = require("path");
const migrationPath = path.resolve(__dirname, "./migrations");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  staging: {
    client: "mysql",
    connection: {
      database: "petAdopt",
      user: "root",
      password: "Sz$8452752",
      port: 3306,
      host: "petadopt.cn1g2k9g4tm7.us-east-1.rds.amazonaws.com",
      // ssl: true, // Enable SSL
      // ssl: {
      //   // SSL options
      //   rejectUnauthorized: false, // Change this based on your SSL configuration
      // },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: migrationPath,
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "petAdopt",
      user: "root",
      password: "Sz$8452752",
      port: 3306,
      host: "petadopt.cn1g2k9g4tm7.us-east-1.rds.amazonaws.com",
      // ssl: true, // Enable SSL
      // ssl: {
      //   // SSL options
      //   rejectUnauthorized: false, // Change this based on your SSL configuration
      // },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: migrationPath,
    },
  },
};
