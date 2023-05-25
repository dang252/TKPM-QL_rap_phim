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
 * /book/schedule?id_movie={id_movie}&date='{date}':
 *  get:
 *   summary: get schedule
 *   tags: [/book]
 *   parameters:
 *     - name: id_movie
 *       in: path
 *       description: Movie's ID
 *       required: true
 *       type: integer
 *     - name: date
 *       in: path
 *       description: Movie's Day
 *       required: true
 *       type: string
 *   responses:
 *     '200':
 *       description: Get schedule successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: schedule's id
 *               id_movie:
 *                 type: integer
 *                 description: schedule's id movie
 *               id_cinema:
 *                 type: integer
 *                 description: schedule's id cinema
 *               id_room:
 *                 type: integer
 *                 description: schedule's id room
 *               date:
 *                 type: string
 *                 description: schedule's date
 *               time:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: schedule's time
 *     '500':
 *       description: Internal server error
 */
router.get("/schedule", bookController.getSchedule);

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
