const { Pool } = require("pg");

const pooldb = new Pool({
  user: "postgres",
  password: "ferver",
  host: "localhost",
  port: 5432,
  database: "taskdb",
});

module.exports = pooldb;
