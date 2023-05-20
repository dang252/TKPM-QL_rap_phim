const authController = require("../app/controllers/auth.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/refresh", authController.requestRefreshToken);
// router.post("/logout", middlewareController.verifyToken, authController.logoutUser);
router.post("/logout",  authController.logoutUser);

module.exports = router;
