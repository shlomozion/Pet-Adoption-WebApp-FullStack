const path = require("path");
const migrationPath = path.resolve(__dirname, "./migrations");

const serverless = require("serverless-mysql");
const db = serverless({
  config: {
    host: "pet-adopt.cn1g2k9g4tm7.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "Sz$8452752",
    database: "petAdopt",
  },
});

module.exports = {
  staging: {
    client: "mysql",
    connection: {
      acquireConnectionTimeout: 10000,
      createConnection: () => db.promise(),
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.query('SET time_zone = "+00:00";', (err) => {
          done(err, conn);
        });
      },
    },
    migrations: {
      tableName: "knex_migrations",
      directory: migrationPath,
    },
  },

  production: {
    client: "mysql",
    connection: {
      acquireConnectionTimeout: 10000,
      createConnection: () => db.promise(),
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.query('SET time_zone = "+00:00";', (err) => {
          done(err, conn);
        });
      },
    },
    migrations: {
      tableName: "knex_migrations",
      directory: migrationPath,
    },
  },
};
