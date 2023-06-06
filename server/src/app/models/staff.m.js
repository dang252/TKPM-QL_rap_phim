const db = require("../../config/connect_db");

const MAX_STAFF_PER_SHIFT = 5;

module.exports = {
  // get list cinema
  getListCinema: async () => {
    try {
      const rs = await db.any("SELECT id, name FROM cinemas");
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // get list shift of a cinema
  getListShift: async (id_cinema) => {
    try {
      const rs = await db.any("SELECT * FROM shifts WHERE id_cinema = $1 ORDER BY id", [id_cinema]);
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // get list shift of a staff
  getStaffShift: async (id_staff) => {
    try {
      const rs = await db.any("SELECT * FROM shifts WHERE EXISTS (SELECT 1 FROM unnest(id_staffs) AS elements WHERE elements = $1)", [id_staff]);
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // shift checking
  isFullShift: async (id_shift) => {
    try {
      const check = await db.oneOrNone(`SELECT array_length(id_staffs, 1) AS array_length FROM shifts WHERE id_shift = $1`, [id_shift]);
      const rs = check ? check.array_length : null; //return the number of staff that registered to this shift
      if (rs === MAX_STAFF_PER_SHIFT) {
        return true;
      }
      return false;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // a staff successfully register to a shift
  addStaffToShift: async (id_shift, id_staff) => {
    try {
      const rs = await db.one(`UPDATE shifts SET id_staffs = id_staffs || '{$1}' WHERE id_shift = $2;`, [id_staff, id_shift]); // add staff to shift table
      const rs1 = await db.one(`UPDATE staff SET id_shifts = id_shifts || '{$1}' WHERE id_user = $2;`, [id_shift, id_staff]); // add shift to staff table

      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // multi shift registering
  shiftsRegister: async (id_shift, id_staff) => {
    try {
      // checking for slot shift
      for (let shift in id_shift) {
        if (this.isFullShift(shift)) {
          return "FAIL";
        }
      }

      // start adding
      for (let shift in id_shift) {
        this.shiftsRegister(shift, id_staff);
      }
      return "OK";
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // create movies
  createMovie: async (movie_info) => {
    try {
      const rs = await db.one("INSERT INTO movie (title, release_date, url_poster, director, actors, genres, duration, age, overview) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [movie_info.title, movie_info.release_date, movie_info.url_poster, movie_info.director, movie_info.actors, movie_info.genres, movie_info.duration, movie_info.age, movie_info.overview]);
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // create full schedule
  createSchedule: async (schedule_info) => {
    try {
      //const check = await db.oneOrNone("SELECT * FROM schedule WHERE id_movie = $1 AND id_cinema = $2 AND id_room = $3 AND date = $4")
      const rs = await db.one("INSERT INTO schedule (id_movie, id_cinema, id_room, date, time) VALUES ($1, $2, $3, $4, $5);", [schedule_info.id_movie, schedule_info.id_cinema, schedule_info.id_room, schedule_info.date, schedule_info.time]);
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // add a showtime to a movie's schedule
  addShowtime: async (schedule_info) => {
    try {
      const rs = await db.one(`UPDATE schedule SET time = time || '{$5}' WHERE id_movie = $1 AND id_cinema = $2 AND id_room = $3 AND date = $4;`, [schedule_info.id_movie, schedule_info.id_cinema, schedule_info.id_room, schedule_info.date, schedule_info.time]);
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // block seat
  blockSeat: async (id_seat, id_schedule) => {
    try {
      const rs = await db.one(`UPDATE seats SET status = -1  WHERE id_seat =  $1 AND id_schedule = $2;`, [id_seat, id_schedule]);
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // multi block seat
  multiBlockSeat: async (id_seat, id_schedule) => {
    try {
      for (seat in id_seat) {
        this.blockSeat(seat, id_schedule);
      }
      return "OK";
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // get list user
  listUser: async () => {
    try {
      const rs = await db.one("SELECT id, name FROM users WHERE is_staffs = 'false'");
      return rs;
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // block user
  blockUser: async (id_user) => {
    try {
      const check = await db.oneOrNone(`SELECT * FROM blacklist WHERE id_user = $1;`, [id_user]);
      if (check !== null) {
        return "FAIL";
      }
      const rs = await db.one("INSERT INTO blacklist VALUES ($1);", [id_user]);
      return "OK";
    } catch (error) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // --------------------- ----------- -----------
  registerShifts: async (id_staff, id_shifts) => {
    try {
      // check if shift full (= 5)
      const id_fail_shifts = await db.one("SELECT ARRAY_AGG(id) FROM shifts WHERE id = ANY($1) AND ARRAY_LENGTH(id_staffs, 1) >= 5;", [id_shifts]);

      let info_success_shifts = id_shifts;
      if (id_fail_shifts.array_agg) {
        info_fail_shifts = await db.any("SELECT id, day, time_start, time_end FROM shifts WHERE id = ANY($1);", [id_fail_shifts.array_agg]);

        id_fail_shifts.array_agg.forEach(function (shift) {
          info_success_shifts.splice(info_success_shifts.indexOf(shift), 1);
        });
      }

      // insert shifts for staff
      await db.none("UPDATE shifts SET id_staffs = id_staffs || $1 WHERE id = ANY($2);", [id_staff, id_shifts]);

      // return result
      if (info_success_shifts.length != id_shifts.length) {
        return { message: "success" };
      } else {
        console.log(id_shifts);
        info_success_shifts = await db.any("SELECT id, day, time_start, time_end FROM shifts WHERE id = ANY($1);", [id_shifts]);

        return {
          message: "fail",
          success_shifts: info_success_shifts,
          fail_shifts: info_fail_shifts,
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
};
