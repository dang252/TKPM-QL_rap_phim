const authRouter = require("./auth.r");
const userRouter = require("./user.r");

function router(app) {
  /**
   * @swagger
   *  components:
   *    schemas:
   *      UserInfo:
   *        type: object
   *        properties:
   *          id:
   *            type: integer
   *            description: user's id
   *          name:
   *            type: string
   *            description: user's name
   *          phone:
   *            type: string
   *            description: user's phone
   *          email:
   *            type: string
   *            description: user's email
   *          dob:
   *            type: string
   *            description: user's date of birth
   *          gender:
   *            type: string
   *            description: user's gender
   *          is_staff:
   *            type: boolean
   *            description: user's role
   * securityDefinitions:
   *  cookieAuth:
   *    type: apiKey
   *    in: cookie
   *    name: refreshToken
   *  tokenAuth:
   *    type: apiKey
   *    in: header
   *    name: token
   */

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
}

module.exports = router;
