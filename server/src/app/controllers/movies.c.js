const moviesModel = require("../models/movies.m");

const moviesController = {
  // [GET] /listMovies
  getListMovies: async (req, res) => {
    try {
      const listMovies = await moviesModel.getListMovies();

      const formattedMovies = listMovies.map((movie) => {
        const { director, actors, genres, duration, age, overview, ...others } = movie;
        return others; // { id, title, release_date, url_poster }
      });

      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[GET] /detail?id={..}
  getDetail: async (req, res) => {
    try {
      const movie = await moviesModel.getDetail(req.query.id);

      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[GET] /currentMovies
  getCurrentMovies: async (req, res) => {
    try {
      const listMovies = await moviesModel.getCurrentMovies();

      const formattedMovies = listMovies.map((movie) => {
        const { director, actors, genres, duration, age, overview, ...others } = movie;
        return others; // { id, title, release_date, url_poster }
      });

      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[GET] /inComingMovies
  getInComingMovies: async (req, res) => {
    try {
      const listMovies = await moviesModel.getInComingMovies();

      const formattedMovies = listMovies.map((movie) => {
        const { director, actors, genres, duration, age, overview, ...others } = movie;
        return others; // { id, title, release_date, url_poster }
      });

      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[GET] /recommendMovies?id_user={id}
  getRecommendMovies: async (req, res) => {
    try {
      const recommendMovies = await moviesModel.getRecommendMovies(req.query.id_user);

      res.status(200).json(recommendMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = moviesController;
