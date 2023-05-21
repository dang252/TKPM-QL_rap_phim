const initOptions = {};
const pgp = require("pg-promise")(initOptions);
require("dotenv").config();

const cn = {
  host: "localhost",
  port: 5432,
  database: process.env.DATABASE_NAME,
  user: "postgres",
  password: process.env.DATABASE_PASSWORD,
  max: 30,
};

module.exports = pgp(cn);
