const db = require("../../config/connect_db");

module.exports = {

  // get all movies
  getListMovies: async () => {
    try {
      const rs = await db.any("SELECT * FROM movies");
      return rs;
    }
    catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }

  },

  // get movie by movie's id
  getDetail: async (id_movie) => {
    try {
      const rs = await db.one("SELECT * FROM movies WHERE id = $1;", [id_movie]);
      return rs;
    }
    catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // get the movies which is now showing
  getCurrentMovies: async () => {
    try {
      const rs = await db.any("SELECT * FROM movies WHERE release_date <= CURRENT_DATE;");
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // get the movies which is incoming
  getInComingMovies: async () => {
    try {
      const rs = await db.any("SELECT * FROM movies WHERE release_date > CURRENT_DATE;");
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
