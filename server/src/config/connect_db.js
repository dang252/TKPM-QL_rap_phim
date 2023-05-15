const initOptions = {};
const pgp = require("pg-promise")(initOptions);

const cn = {
  host: "localhost",
  port: 5432,
  database: "QLRP",
  user: "postgres",
  password: "123456",
  max: 30,
};

module.exports = pgp(cn);
