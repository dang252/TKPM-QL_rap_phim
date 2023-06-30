const initOptions = {};
const pgp = require("pg-promise")(initOptions);
require("dotenv").config();

const cn = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  max: process.env.DATABASE_MAX,
};

module.exports = pgp(cn);
