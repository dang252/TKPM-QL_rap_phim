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
 *       description: Get list all movies successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: movie's id
 *                 title:
 *                   type: string
 *                   description: movie's title
 *                 release_date:
 *                   type: string
 *                   description: movie's release date
 *                 url_poster:
 *                   type: string
 *                   description: movie's url poster
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
 *       description: Get movie's detail successfully
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
 *       description: Get current movies successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: movie's id
 *                 title:
 *                   type: string
 *                   description: movie's title
 *                 release_date:
 *                   type: string
 *                   description: movie's release date
 *                 url_poster:
 *                   type: string
 *                   description: movie's url poster
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
 *       description: Get in coming movies successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: movie's id
 *                 title:
 *                   type: string
 *                   description: movie's title
 *                 release_date:
 *                   type: string
 *                   description: movie's release date
 *                 url_poster:
 *                   type: string
 *                   description: movie's url poster
 *     '500':
 *       description: Internal server error
 */
router.get("/inComingMovies", moviesController.getInComingMovies);

/**
 * @swagger
 * /movies/recommendMovies?id_user={id_user}:
 *  get:
 *   summary: get recommend movies and genres
 *   tags: [/movies]
 *   parameters:
 *     - name: id_user
 *       in: path
 *       description: user's ID
 *       required: true
 *       type: integer
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Get recommend movies and genres successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genres:
 *                 type: string
 *                 description: genres' name
 *               movies:
 *                 $ref: '#/components/schemas/MovieDetail'
 *     '500':
 *       description: Internal server error
 */
router.get("/recommendMovies", middlewareController.verifyToken, moviesController.getRecommendMovies);

module.exports = router;
