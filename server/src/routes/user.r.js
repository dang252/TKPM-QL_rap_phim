const userController = require("../app/controllers/user.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

router.get("/profile", middlewareController.verifyToken, userController.getProfile);
router.post("/profile", middlewareController.verifyToken, userController.updateProfile);
router.post("/changePassword", middlewareController.verifyToken, userController.changePassword);
router.get("/booking_history", middlewareController.verifyToken, userController.getBookingHistory);

module.exports = router;
