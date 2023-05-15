const userController = require("../app/controllers/user.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

router.get("/profile", middlewareController.verifyToken, userController.getProfile);

module.exports = router;
