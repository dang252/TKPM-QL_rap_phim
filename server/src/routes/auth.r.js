const authController = require("../app/controllers/auth.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: /auth
 *   description: API for user authentication
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   summary: user register
 *   tags: [/auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: user's name
 *             phone:
 *               type: string
 *               description: user's phone
 *             email:
 *               type: string
 *               description: user's email
 *             password:
 *               type: string
 *               description: user's password
 *             dob:
 *               type: string
 *               description: user's date of birth
 *             gender:
 *               type: string
 *               description: user's gender
 *   responses:
 *     '200':
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     '409':
 *       description: Email already exists! / Phone already exists!
 *     '500':
 *       description: Internal server error
 */
router.post("/register", authController.registerUser);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: user login
 *   tags: [/auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: user's email/phone
 *             password:
 *               type: string
 *               description: user's password
 *   responses:
 *     '200':
 *       description: Login successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *             - $ref: '#/components/schemas/UserInfo'
 *             - type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *     '401':
 *       description: Wrong Password!
 *     '404':
 *       description: Account doesn't exist!
 *     '500':
 *       description: Internal server error
 */
router.post("/login", authController.loginUser);

/**
 * @swagger
 * /auth/refresh:
 *  post:
 *   summary: user requests for new access token and new refresh token
 *   tags: [/auth]
 *   security:
 *     - cookieAuth: []
 *   responses:
 *     '200':
 *       description: Refresh successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: JWT access token
 *     '401':
 *       description: 401 Unauthorized!
 *     '403':
 *       description: 403 Forbidden!
 *     '500':
 *       description: Internal server error
 */
router.post("/refresh", authController.requestRefreshToken);

/**
 * @swagger
 * /auth/logout:
 *  post:
 *   summary: user logout
 *   tags: [/auth]
 *   security:
 *     - cookieAuth: []
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       description: Logged out successfully!
 *     '401':
 *       description: 401 Unauthorized!
 *     '403':
 *       description: 403 Forbidden!
 *     '500':
 *       description: Internal server error
 */
router.post("/logout", middlewareController.verifyToken, authController.logoutUser);

module.exports = router;
