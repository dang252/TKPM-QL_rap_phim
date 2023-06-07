const staffController = require("../app/controllers/staff.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: /staff
 *   description: API for staff actions
 */

/**
 * @swagger
 * /staff/listCinema:
 *  get:
 *   summary: get all the cinema
 *   tags: [/staff]
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: get list of cinema successfully
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
router.get("/listCinema", middlewareController.verifyToken, staffController.getListCinema);

/**
 * @swagger
 * /staff/listShift?id_cinema={id_cinema}:
 *  get:
 *   summary: get all working shift of a cinema
 *   tags: [/staff]
 *   parameters:
 *     - name: id_cinema
 *       in: path
 *       description: cinema's ID
 *       required: true
 *       type: integer
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: get list of shift successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Shifts'
 *     '500':
 *       description: Internal server error
 */
router.get("/listShift", middlewareController.verifyToken, staffController.getListShift);

/**
 * @swagger
 * /staff/staffShift?id_staff={id_staff}:
 *  get:
 *   summary: get registered working shift of a staff
 *   tags: [/staff]
 *   parameters:
 *     - name: id_staff
 *       in: path
 *       description: staff's ID
 *       required: true
 *       type: integer
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: get list of shift successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Shifts'
 *     '500':
 *       description: Internal server error
 */
router.get("/staffShift", middlewareController.verifyToken, staffController.getStaffShift);

/**
 * @swagger
 * /staff/shiftsRegister:
 *  post:
 *   summary: staff send shifts registered
 *   tags: [/staff]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id_shift:
 *               type: [integer]
 *               description: shifts's id that staff want to register
 *             id_staff:
 *               type: integer
 *               description: staff's id
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: message "OK" if success, "FAIL" if fail to Register due to some fully shift
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                message:
 *                  type: string
 *                  description: OK if success, FAIL if fail to Register due to some fully shift
 *     '500':
 *       description: Internal server error
 */
router.post("/shiftsRegister", middlewareController.verifyToken, staffController.postShiftsRegister);

/**
 * @swagger
 * /staff/createMovie:
 *  post:
 *   summary: staff create a new movie
 *   tags: [/staff]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: movie's title
 *             release_date:
 *               type: string
 *               description: yyyy/mm/dd
 *             url_poster:
 *               type: string
 *               description: link of movie's poster
 *             director:
 *               type: string
 *               description: director of movie
 *             actors:
 *               type: string
 *               description: actors of movie
 *             genres:
 *               type: [integer]
 *               description: genres of movie
 *             duration:
 *               type: string
 *               description: hh:mm:ss
 *             age:
 *               type: integer
 *               description: age limitation of movie
 *             overview:
 *               type: string
 *               description: overview of movie
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Add movie Successfully!
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieDetail'
 *     '500':
 *       description: Internal server error
 */
router.post("/createMovie", middlewareController.verifyToken, staffController.postCreateMovie);

/**
 * @swagger
 * /staff/createSchedule:
 *  post:
 *   summary: staff create a new schedule of a movie
 *   tags: [/staff]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id_movie:
 *               type: integer
 *               description: movie's id
 *             id_cinema:
 *               type: integer
 *               description: cinema's id
 *             id_room:
 *               type: integer
 *               description: room's id
 *             date:
 *               type: string
 *               description: yyyy/mm/dd
 *             time:
 *               type: [string]
 *               description: hh:mm:ss
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Create schedule Successfully!
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     '500':
 *       description: Internal server error
 */
router.post("/createSchedule", middlewareController.verifyToken, staffController.postCreateSchedule);

/**
 * @swagger
 * /staff/addShowtime:
 *  post:
 *   summary: staff add a new showtime of a movie
 *   tags: [/staff]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id_movie:
 *               type: integer
 *               description: movie's id
 *             id_cinema:
 *               type: integer
 *               description: cinema's id
 *             id_room:
 *               type: integer
 *               description: room's id
 *             date:
 *               type: string
 *               description: yyyy/mm/dd
 *             time:
 *               type: string
 *               description: hh:mm:ss
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Add showtime Successfully!
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     '500':
 *       description: Internal server error
 */
router.post("/addShowtime", middlewareController.verifyToken, staffController.postAddShowtime);

/**
 * @swagger
 * /staff/blockSeat:
 *  post:
 *   summary: staff block seats of a schedule
 *   tags: [/staff]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id_seat:
 *               type: [integer]
 *               description: seats's id
 *             id_schedule:
 *               type: integer
 *               description: schedule's id
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: message OK if success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                message:
 *                  type: string
 *                  description: OK if success
 *     '500':
 *       description: Internal server error
 */
router.post("/blockSeat", middlewareController.verifyToken, staffController.postBlockSeat);

/**
 * @swagger
 * /staff/listUser:
 *  get:
 *   summary: get list of user
 *   tags: [/staff]
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: get list of user successfully!
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/UserInfo'
 *     '500':
 *       description: Internal server error
 */
router.get("/listUser", middlewareController.verifyToken, staffController.getListUser);

/**
 * @swagger
 * /staff/blockUser:
 *  post:
 *   summary: staff block a User
 *   tags: [/staff]
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
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: message "OK" if success, "FAIL" if fail because it has been block before
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                message:
 *                  type: string
 *                  description: OK if success, FAIL if fail because it has been block before
 *     '500':
 *       description: Internal server error
 */
router.post("/blockUser", middlewareController.verifyToken, staffController.postBlockUser);

// --------------------- ----------- -----------
/**
 * @swagger
 * /staff/registerShifts:
 *  put:
 *   summary: staff registers for work shifts
 *   tags: [/staff]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id_staff:
 *               type: integer
 *               description: staff's id
 *             id_shifts:
 *               type: array
 *               items:
 *                 type: integer
 *                 description: shifts' id
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Update staff's shifts successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *     '409':
 *       description: Update staff's shifts unsuccessfully
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *     '500':
 *       description: Internal server error
 */
router.put("/registerShifts", middlewareController.verifyToken, staffController.putRegisterShifts);

/**
 * @swagger
 * /staff/updateSchedule:
 *  put:
 *   summary: staff updates schedule
 *   tags: [/staff]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id_movie:
 *               type: integer
 *               description: movie's id
 *             id_cinema:
 *               type: integer
 *               description: cinema's id
 *             id_room:
 *               type: integer
 *               description: room's id
 *             date:
 *               type: string
 *               description: schedule's date
 *             time:
 *               type: array
 *               items:
 *                 type: string
 *                 description: schedule's time
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Update successfully!
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *     '409':
 *       description: The schedule you entered has been overlapped with the existing one!
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *     '500':
 *       description: Internal server error
 */
router.put("/updateSchedule", middlewareController.verifyToken, staffController.updateSchedule);

module.exports = router;
