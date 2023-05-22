const moviesModel = require("../models/movies.m");

const moviesController = {
  // [GET] /getListMovies
  getListMovies: async (req, res) => {
    try {
      const listMovies = await moviesModel.getListMovies();
      
      const formattedMovies = listMovies.map(movie => {
        const { director, actors, genres, duration, age, overview, ...others } = movie;
        return others; // { id, title, release_date, url_poster }
      });

      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },


  //[GET] /getDetail?id={..}
  getDetail: async (req, res) => {
    try {
      const movie = await moviesModel.getDetail(req.query.id);

      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },


  //[GET] /getCurrentMovies
  getCurrentMovies: async (req, res) => {
    try {
      const listMovies = await moviesModel.getCurrentMovies();
      
      const formattedMovies = listMovies.map(movie => {
        const { director, actors, genres, duration, age, overview, ...others } = movie;
        return others; // { id, title, release_date, url_poster }
      });

      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[GET] /getInComingMovies
  getInComingMovies: async (req, res) => {
    try {
      const listMovies = await moviesModel.getInComingMovies();
      
      const formattedMovies = listMovies.map(movie => {
        const { director, actors, genres, duration, age, overview, ...others } = movie;
        return others; // { id, title, release_date, url_poster }
      });

      res.status(200).json(formattedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

};

module.exports = moviesController;
