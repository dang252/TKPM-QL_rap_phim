const authRouter = require("./auth.r");
const userRouter = require("./user.r");
const moviesRouter = require("./movies.r");
const bookRouter = require("./book.r");
const staffRouter = require("./staff.r");

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
   *      BookDetail:
   *        type: object
   *        properties:
   *          cinema_name:
   *            type: string
   *            description: cinema's name
   *          location:
   *            type: string
   *            description: cinema's location
   *          purchase_date:
   *            type: string
   *            description: ticket's purchase_date
   *          title:
   *            type: string
   *            description: movie's title
   *          start_time:
   *            type: string
   *            description: movie's start time
   *          end_time:
   *            type: string
   *            description: movie's end time
   *          room_name:
   *            type: string
   *            description: room's name
   *          seats:
   *            type: array
   *            items:
   *              type: string
   *            description: seat code
   *          food_drink:
   *            type: array
   *            items:
   *              type: string
   *            description: food_drink's name
   *          total_price:
   *            type: number
   *            description: ticket's total_price
   *      Cinemas:
   *        type: object
   *        properties:
   *          id:
   *            type: integer
   *            description: cinema's id
   *          name:
   *            type: string
   *            description: cinema's name
   *          province:
   *            type: string
   *            description: province where cinema locates
   *          location:
   *            type: string
   *            description: detail address
   *      Shifts:
   *        type: object
   *        properties:
   *          id:
   *            type: integer
   *            description: shift's id
   *          id_cinema:
   *            type: integer
   *            description: cinema's id
   *          day:
   *            type: string
   *            description: date showtime
   *          time_start:
   *            type: string
   *            description: hh:mm:ss
   *          time_end:
   *            type: string
   *            description: hh:mm:ss
   *          id_staffs:
   *            type: array
   *            items:
   *              type: integer
   *            description: ids of staff attend this shift
   *      Schedule:
   *        type: object
   *        properties:
   *          id:
   *            type: integer
   *            description: schedule's id
   *          id_movie:
   *            type: integer
   *            description: movie's id
   *          id_cinema:
   *            type: integer
   *            description: cinema's id
   *          id_room:
   *            type: integer
   *            description: room's id
   *          date:
   *            type: string
   *            description: date showing (yyyy/mm/dd)
   *          time:
   *            type: array
   *            items:
   *              type: integer
   *            description: showtime (hh:mm:ss)
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
  app.use("/book", bookRouter);
  app.use("/staff", staffRouter);
}

module.exports = router;
