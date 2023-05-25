const bookController = require("../app/controllers/book.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

router.get("/schedule", middlewareController.verifyToken, bookController.getSchedule);
router.get("/seats", middlewareController.verifyToken, bookController.getSeats);
router.get("/food_drink", middlewareController.verifyToken, bookController.getFoodDrink);
router.post("/ticket_price", middlewareController.verifyToken, bookController.getTicketPrice);
router.post("/bookTickets", middlewareController.verifyToken, bookController.postBook);

module.exports = router;
