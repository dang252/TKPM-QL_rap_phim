const staffController = require("../app/controllers/staff.c");
const middlewareController = require("../middleware/middleware.js");

const router = require("express").Router();

router.get("/listCinema", middlewareController.verifyToken, staffController.getListCinema);

router.get("/listShift", middlewareController.verifyToken, staffController.getListShift);

router.get("/staffShift", middlewareController.verifyToken, staffController.getStaffShift);

router.post("/shiftsRegister", middlewareController.verifyToken, staffController.postShiftsRegister);

router.post("/createMovie", middlewareController.verifyToken, staffController.postCreateMovie);

router.post("/createSchedule", middlewareController.verifyToken, staffController.postCreateSchedule);

router.post("/addShowtime", middlewareController.verifyToken, staffController.postAddShowtime);

router.post("/blockSeat", middlewareController.verifyToken, staffController.postBlockSeat);

router.post("/listUser", middlewareController.verifyToken, staffController.getListUser);

router.post("/blockUser", middlewareController.verifyToken, staffController.postBlockUser);

module.exports = router;
