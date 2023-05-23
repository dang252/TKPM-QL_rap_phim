const moviesController = require("../app/controllers/movies.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: /movies
 *   description: API for movies
 */

/**
 * @swagger
 * /movies/listMovies:
 *  get:
 *   summary: get all movies
 *   tags: [/movies]
 *   responses:
 *     '200':
 *       description: get list all movies successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: movie's id
 *               title:
 *                 type: string
 *                 description: movie's title
 *               release_date:
 *                 type: string
 *                 description: movie's release date
 *               url_poster:
 *                 type: string
 *                 description: movie's url poster
 *     '500':
 *       description: Internal server error
 */
router.get("/listMovies", moviesController.getListMovies);

/**
 * @swagger
 * /movies/detail?id={id}:
 *  get:
 *   summary: get movie's detail by id
 *   tags: [/movies]
 *   parameters:
 *     - name: id
 *       in: path
 *       description: Movie's ID
 *       required: true
 *       type: integer
 *   responses:
 *     '200':
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieDetail'
 *     '500':
 *       description: Internal server error
 */
router.get("/detail", moviesController.getDetail);

/**
 * @swagger
 * /movies/currentMovies:
 *  get:
 *   summary: get all current movies
 *   tags: [/movies]
 *   responses:
 *     '200':
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/MovieDetail'
 *     '500':
 *       description: Internal server error
 */
router.get("/currentMovies", moviesController.getCurrentMovies);

/**
 * @swagger
 * /movies/inComingMovies:
 *  get:
 *   summary: get all in coming movies
 *   tags: [/movies]
 *   responses:
 *     '200':
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/MovieDetail'
 *     '500':
 *       description: Internal server error
 */
router.get("/inComingMovies", moviesController.getInComingMovies);

module.exports = router;
