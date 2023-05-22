const moviesController = require("../app/controllers/movies.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

router.get("/getListMovies", moviesController.getListMovies);
router.get("/getDetail", moviesController.getDetail);
router.get("/getCurrentMovies", moviesController.getCurrentMovies);
router.get("/getInComingMovies", moviesController.getInComingMovies);

module.exports = router;
