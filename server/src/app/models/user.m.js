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
      const rs = await db.one("SELECT id, name, phone, email, password, dob AT TIME ZONE 'UTC' AT TIME ZONE 'GMT+7' AS dob, gender, is_staff FROM users WHERE id = $1;", [id]);
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  checkNotLocked: async (id_user) => {
    try {
      await db.any("SELECT * FROM blacklist WHERE id_user = $1;", [id_user]);
      return false;
    } catch (err) {
      if (err.code === 0) {
        return true;
      } else {
        throw err;
      }
    }
  },
  updateProfile: async (user) => {
    try {
      const rs = await db.one("UPDATE users SET name = $2, phone = $3, email = $4, dob = $5, gender = $6 WHERE id = $1 RETURNING *;", [user.id, user.name, user.phone, user.email, user.dob, user.gender]);
      return rs;
    } catch (err) {
      console.log("Error in updateProfile in user.m: ", err);
      return null;
    }
  },
  changePassword: async (user) => {
    try {
      const rs = await db.one("UPDATE users SET password = $2 WHERE id = $1 RETURNING *;", [user.id, user.password]);
      return rs;
    } catch (err) {
      console.log("Error in changePassword in user.m: ", err);
      return null;
    }
  },
  bookingHistory: async (id_user) => {
    try {
      const rs = await db.any("SELECT * FROM get_booking_history($1);", [id_user]);
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
