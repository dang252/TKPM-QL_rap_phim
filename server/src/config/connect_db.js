const initOptions = {};
const pgp = require("pg-promise")(initOptions);

const cn = {
  host: "localhost",
  port: 5432,
  database: "TKPM_MOVIE",
  user: "postgres",
  password: "123",
  max: 30,
};

module.exports = pgp(cn);
