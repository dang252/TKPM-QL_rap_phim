const userController = require("../app/controllers/user.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: /user
 *   description: API for user actions
 */

/**
 * @swagger
 * /user/profile?id={id}:
 *  get:
 *   summary: get information in user's profile
 *   tags: [/user]
 *   parameters:
 *     - name: id
 *       in: path
 *       description: User's ID
 *       required: true
 *       type: integer
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     '500':
 *       description: Internal server error
 */
router.get("/profile", middlewareController.verifyToken, userController.getProfile);

/**
 * @swagger
 * /user/profile:
 *  post:
 *   summary: update information in user's profile
 *   tags: [/user]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: user's id
 *             name:
 *               type: string
 *               description: user's name
 *             phone:
 *               type: string
 *               description: user's phone
 *             email:
 *               type: string
 *               description: user's email
 *             dob:
 *               type: string
 *               description: user's date of birth
 *             gender:
 *               type: string
 *               description: user's gender
 *   security:
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     '500':
 *       description: Internal server error
 */
router.post("/profile", middlewareController.verifyToken, userController.updateProfile);

/**
 * @swagger
 * /user/changePassword:
 *  post:
 *   summary: user change password
 *   tags: [/user]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: user's id
 *             oldPassword:
 *               type: string
 *               description: user's old password
 *             newPassword:
 *               type: string
 *               description: user's new password
 *   responses:
 *     '200':
 *       description: Change Password Successfully!
 *     '401':
 *       description: Incorrect Old Password!
 *     '500':
 *       description: Internal server error
 */
router.post("/changePassword", middlewareController.verifyToken, userController.changePassword);

/**
 * @swagger
 * /user/booking_history?id={id}:
 *  get:
 *   summary: get user's booking history
 *   tags: [/user]
 *   security:
 *     - tokenAuth: []
 *   parameters:
 *     - name: id
 *       in: path
 *       description: User's ID
 *       required: true
 *       type: integer
 *   responses:
 *     '200':
 *       description: Get booking history successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookDetail'
 *     '500':
 *       description: Internal server error
 */
router.get("/booking_history", middlewareController.verifyToken, userController.getBookingHistory);

/**
 * @swagger
 * /user/delete_history?id_book={id_book}:
 *  delete:
 *   summary: delete user's booking history
 *   tags: [/user]
 *   security:
 *     - tokenAuth: []
 *   parameters:
 *     - name: id_book
 *       in: path
 *       description: Book's ID
 *       required: true
 *       type: integer
 *   responses:
 *     '200':
 *       description: Delete Successfully!
 *     '409':
 *       description: Can't delete this before the movie screening!
 *     '500':
 *       description: Internal server error
 */
router.delete("/delete_history", middlewareController.verifyToken, userController.deleteHistory);

/**
 * @swagger
 * /user/delete_account?id_user={id_user}&password={password}:
 *  delete:
 *   summary: delete user's booking history
 *   tags: [/user]
 *   security:
 *     - tokenAuth: []
 *   parameters:
 *     - name: id_user
 *       in: path
 *       description: User's ID
 *       required: true
 *       type: integer
 *     - name: password
 *       in: path
 *       description: User's password
 *       required: true
 *       type: string
 *   responses:
 *     '200':
 *       description: Delete Successfully!
 *     '401':
 *       description: Wrong password!
 *     '500':
 *       description: Internal server error
 */
router.delete("/delete_account", middlewareController.verifyToken, userController.deleteAccount);

module.exports = router;
