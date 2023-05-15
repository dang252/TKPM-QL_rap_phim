const db = require("../../config/connect_db");

module.exports = {
  getUsers: async () => {
    const rs = await db.any("SELECT * FROM users");
    return rs;
  },
  addUser: async (user) => {
    const rs = await db.one("INSERT INTO users (name, phone, email, password, dob, gender, is_staff) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;", [user.name, user.phone, user.email, user.password, user.dob, user.gender, false]);
    return rs;
  },
  getUserByUsername: async (username) => {
    try {
      const rs = await db.one("SELECT * FROM users WHERE email = $1 OR phone = $1;", [username]);
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getUserByID: async (id) => {
    try {
      const rs = await db.one("SELECT * FROM users WHERE id = $1;", [id]);
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
};
