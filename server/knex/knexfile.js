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
      database: "pet_adoption",
      user: "root",
      password: "",
      host: "127.0.0.1",
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
      database: "pet_adoption",
      user: "root",
      password: "",
      host: "127.0.0.1",
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
