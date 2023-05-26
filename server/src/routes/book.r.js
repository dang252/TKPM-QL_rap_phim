const bookController = require("../app/controllers/book.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: /book
 *   description: API for booking tickets
 */

/**
 * @swagger
 * /book/provinces:
 *  get:
 *   summary: get provinces
 *   tags: [/book]
 *   responses:
 *     '200':
 *       description: Get provinces successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 province:
 *                   type: string
 *                   description: province's name
 *     '500':
 *       description: Internal server error
 */
router.get("/provinces", bookController.getProvinces);

/**
 * @swagger
 * /book/provinces:
 *  post:
 *   summary: get cinemas by province
 *   tags: [/book]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             province:
 *               type: string
 *               description: province's name
 *   responses:
 *     '200':
 *       description: Get cinemas successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: cinema's id
 *                 name:
 *                   type: string
 *                   description: cinema's name
 *     '500':
 *       description: Internal server error
 */
router.post("/provinces", bookController.getCinemas);

/**
 * @swagger
 * /book/cinema?id_cinema={id_cinema}:
 *  get:
 *   summary: get cinema's detail
 *   tags: [/book]
 *   parameters:
 *     - name: id_cinema
 *       in: path
 *       description: cinema's ID
 *       required: true
 *       type: integer
 *   responses:
 *     '200':
 *       description: Get cinema's detail successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: cinema's id
 *               name:
 *                 type: string
 *                 description: cinema's name
 *               province:
 *                 type: string
 *                 description: cinema's province
 *               location:
 *                 type: string
 *                 description: cinema's location
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: schedule's id
 *                     movie_title:
 *                       type: string
 *                       description: movie's title
 *                     movie_poster:
 *                       type: string
 *                       description: movie's poster
 *                     room_name:
 *                       type: string
 *                       description: room's name
 *                     date:
 *                       type: string
 *                       description: date
 *                     time:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: schedule's time
 *                 description: cinema's schedule
 *     '500':
 *       description: Internal server error
 */
router.get("/cinema", bookController.getCinemaDetail);

/**
 * @swagger
 * /book/schedule:
 *  post:
 *   summary: get schedule
 *   tags: [/book]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           oneOf:
 *             - type: object
 *               properties:
 *                 id_movie:
 *                   type: integer
 *                   description: schedule's id_movie
 *               example:
 *                 id_movie: 1
 *             - type: object
 *               properties:
 *                 id_movie:
 *                   type: integer
 *                   description: schedule's id_movie
 *                 date:
 *                   type: string
 *                   description: schedule's date
 *               example:
 *                 id_movie: 1
 *                 date: 2023-05-24
 *             - type: object
 *               properties:
 *                 id_movie:
 *                   type: integer
 *                   description: schedule's id_movie
 *                 date:
 *                   type: string
 *                   description: schedule's date
 *                 province:
 *                   type: string
 *                   description: cinema's province
 *               example:
 *                 id_movie: 1
 *                 date: 2023-05-24
 *                 province: Hà Nội
 *   responses:
 *     '200':
 *       description: Get schedule successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: schedule's id
 *                 id_movie:
 *                   type: integer
 *                   description: schedule's id movie
 *                 id_cinema:
 *                   type: integer
 *                   description: schedule's id cinema
 *                 id_room:
 *                   type: integer
 *                   description: schedule's id room
 *                 date:
 *                   type: string
 *                   description: schedule's date
 *                 time:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: schedule's time
 *     '500':
 *       description: Internal server error
 */
router.post("/schedule", bookController.getSchedule);

/**
 * @swagger
 * /book/seats?id_schedule={id_schedule}:
 *  get:
 *   summary: get seats
 *   tags: [/book]
 *   parameters:
 *     - name: id_schedule
 *       in: path
 *       description: Schedule's ID
 *       required: true
 *       type: integer
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Get seats successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_seat:
 *                   type: integer
 *                   description: seat's id
 *                 id_schedule:
 *                   type: integer
 *                   description: schedule's id
 *                 name:
 *                   type: string
 *                   description: seat's name
 *                 status:
 *                   type: integer
 *                   description: seat's status
 *     '500':
 *       description: Internal server error
 */
router.get("/seats", middlewareController.verifyToken, bookController.getSeats);

/**
 * @swagger
 * /book/food_drink:
 *  get:
 *   summary: get information about food and drink
 *   tags: [/book]
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Get information about food and drink successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: food_drink's id
 *                 name:
 *                   type: string
 *                   description: food_drink's name
 *                 description:
 *                   type: string
 *                   description: food_drink's description
 *                 price:
 *                   type: number
 *                   description: food_drink's price
 *     '500':
 *       description: Internal server error
 */
router.get("/food_drink", middlewareController.verifyToken, bookController.getFoodDrink);

/**
 * @swagger
 * /book/ticket_price:
 *  post:
 *   summary: get ticket price
 *   tags: [/book]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               description: schedule's date
 *             time:
 *               type: string
 *               description: schedule's time
 *             user_dob:
 *               type: string
 *               description: user's date of birth
 *             id_room:
 *               type: integer
 *               description: room's id
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Get ticket price successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 description: ticket's price
 *     '500':
 *       description: Internal server error
 */
router.post("/ticket_price", bookController.getTicketPrice);

/**
 * @swagger
 * /book/bookTickets:
 *  post:
 *   summary: post information of tickets
 *   tags: [/book]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id_user:
 *               type: integer
 *               description: user's id
 *             id_seats:
 *               type: array
 *               items:
 *                 type: integer
 *               description: seats' id
 *             id_schedule:
 *               type: integer
 *               description: schedule's id
 *             id_food_drink:
 *               type: array
 *               items:
 *                 type: integer
 *               description: food_drink's id
 *             start_time:
 *               type: string
 *               description: movie's start time
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Book successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookDetail'
 *     '500':
 *       description: Internal server error
 */
router.post("/bookTickets", middlewareController.verifyToken, bookController.postBook);

module.exports = router;
