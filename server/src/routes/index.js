const authRouter = require("./auth.r");
const userRouter = require("./user.r");
const moviesRouter = require("./movies.r");

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
   *      MovieDetail:
   *        type: object
   *        properties:
   *          id:
   *            type: integer
   *            description: movie's id
   *          title:
   *            type: string
   *            description: movie's title
   *          release_date:
   *            type: string
   *            description: movie's release date
   *          url_poster:
   *            type: string
   *            description: movie's url_poster
   *          director:
   *            type: string
   *            description: movie's director
   *          actors:
   *            type: string
   *            description: movie's actors
   *          genres:
   *            type: string
   *            description: movie's genres
   *          duration:
   *            type: string
   *            description: movie's duration
   *          age:
   *            type: integer
   *            description: movie's limited age
   *          overview:
   *            type: string
   *            description: movie's overview
   *    securitySchemes:
   *      cookieAuth:
   *        type: apiKey
   *        in: cookie
   *        name: refreshToken
   *      tokenAuth:
   *        type: apiKey
   *        in: header
   *        name: token
   */

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/movies", moviesRouter);
}

module.exports = router;
