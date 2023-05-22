const moviesController = require("../app/controllers/movies.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

router.get("/getListMovies", middlewareController.verifyToken, moviesController.getListMovies);
router.get("/getDetail", middlewareController.verifyToken, moviesController.getDetail);
router.get("/getCurrentMovies", middlewareController.verifyToken, moviesController.getCurrentMovies);
router.get("/getInComingMovies", middlewareController.verifyToken, moviesController.getInComingMovies);

module.exports = router;
