const staffModel = require("../models/staff.m");

const moviesController = {
  // [GET] /listCinema
  getListCinema: async (req, res) => {
    try {
      const listCinema = await staffModel.getListCinema();

      res.status(200).json(
        listCinema
        // { id, name }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] /listShift
  getListShift: async (req, res) => {
    try {
      const listShift = await staffModel.getListShift(req.query.id_cinema);

      res.status(200).json(
        listShift
        // { id_shift, id_cinema, day, time_start, time_end, id_staff[] }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] /staffShift
  getStaffShift: async (req, res) => {
    try {
      const listShift = await staffModel.getStaffShift(req.query.id_staff);

      res.status(200).json(
        listShift
        // { id_shift, id_cinema, day, time_start, time_end, id_staff[] }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[POST] /shiftRegister
  postShiftsRegister: async (req, res) => {
    try {
      const shiftRegister = await staffModel.shiftsRegister(req.body.id_shift, req.body.id_staff);
      // id_shift[] :array of the chosen shift
      // id_staff: id of the staff

      if (shiftRegister === "FAIL") {
        res.status(200).json(
          "FAIL"
          // fail to register
        );
      } else {
        res.status(200).json("OK");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[POST] /createMovie
  postCreateMovie: async (req, res) => {
    try {
      const rs = await staffModel.createMovie({
        title: req.body.title,
        release_date: req.body.release_date,
        url_poster: req.body.url_poster,
        director: req.body.director,
        actors: req.body.actors,
        genres: req.body.genres,
        duration: req.body.duration,
        age: req.body.age,
        overview: req.body.overview,
      });

      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[POST] /createSchedule
  postCreateSchedule: async (req, res) => {
    try {
      const rs = await staffModel.createSchedule({
        id_movie: req.body.id_movie,
        id_cinema: req.body.id_cinema,
        id_room: req.body.id_room,
        date: req.body.date,
        time: req.body.time,
      });

      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[POST] /addShowtime
  postAddShowtime: async (req, res) => {
    try {
      const rs = await staffModel.addShowtime({
        id_movie: req.body.id_movie,
        id_cinema: req.body.id_cinema,
        id_room: req.body.id_room,
        date: req.body.date,
        time: req.body.time,
      });

      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[POST] /blockSeat
  postBlockSeat: async (req, res) => {
    try {
      const rs = await staffModel.multiBlockSeat(req.body.id_seat, req.body.id_schedule);
      // id_seat[]: array of seat's id

      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[GET] /getUser
  getListUser: async (req, res) => {
    try {
      const rs = await staffModel.listUser();
      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //[POST] /blockUser
  postBlockUser: async (req, res) => {
    try {
      const rs = await staffModel.blockUser(req.body.id_user); // return "FAIL" if it has been blocked
      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // --------------------- ----------- -----------
  // [PUT] /registerShifts
  putRegisterShifts: async (req, res) => {
    try {
      const rs = await staffModel.registerShifts(req.body.id_staff, req.body.id_shifts);

      if (rs.message == "fail") {
        // res.status(409).json(`The work shift on ${rs.fail_shifts[0].day} at ${rs.fail_shifts[0].time_start} - ${rs.fail_shifts[0].time_end} you registered for is full!`);
        res.status(409).json({ success_shifts: rs.success_shifts, fail_shifts: rs.fail_shifts });
      } else {
        res.status(200).json("Register for work shifts successfully!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [PUT] /updateSchedule
  updateSchedule: async (req, res) => {
    try {
      const newSchedule = {
        id_movie: req.body.id_movie,
        id_cinema: req.body.id_cinema,
        id_room: req.body.id_room,
        date: req.body.date,
        time: req.body.time,
      };

      const rs = await staffModel.updateSchedule(newSchedule);

      if (rs == "Fail!") {
        res.status(409).json("One of the schedule you entered has been overlapped with the existing one!");
      } else {
        res.status(200).json("Update successfully!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = moviesController;
