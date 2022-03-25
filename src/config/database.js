const pool = require("pg").Pool;

const dbPool = new pool({
  user: "postgres",
  password: "AllAmerican2!",
  host: "localhost",
  port: 5432,
  database: "legacydb",
  max: 20,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

module.exports = dbPool;
