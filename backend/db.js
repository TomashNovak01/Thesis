const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "root1234!",
  host: "localhost",
  port: 5432,
  database: "field_act_db",
});

module.exports = pool;
