const db = require("../../config/connect_db");

const MAX_STAFF_PER_SHIFT = 5;

module.exports = {

  // get list room
  getListRoom: async (id_cinema) => {
    try {
      return await db.any(`SELECT id,name FROM rooms WHERE id_cinemas @> ARRAY[ $1 ];`, [parseInt(id_cinema)]);
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  // get list cinema
  getListCinema: async () => {
    try {
      return await db.any("SELECT id, name FROM cinemas");
    } catch (err) {
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
      return await db.any("SELECT * FROM shifts WHERE id_cinema = $1 ORDER BY id", [id_cinema]);
    } catch (err) {
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
      return await db.any(`SELECT province, name, location, day, time_start, time_end  FROM 
      (select * from shifts, cinemas where shifts.id_cinema = cinemas.id) as shift_cine
    WHERE EXISTS (SELECT 1 FROM unnest(id_staffs) AS elements WHERE elements = $1)`, [id_staff]);
    } catch (err) {
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
      return await db.one("INSERT INTO movies (title, release_date, url_poster, director, actors, genres, duration, age, overview) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [movie_info.title, movie_info.release_date, movie_info.url_poster, movie_info.director, movie_info.actors, movie_info.genres, movie_info.duration, movie_info.age, movie_info.overview]);
    } catch (err) {
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
      return await db.one("INSERT INTO schedule (id_movie, id_cinema, id_room, date, time) VALUES ($1, $2, $3, $4, $5);", [schedule_info.id_movie, schedule_info.id_cinema, schedule_info.id_room, schedule_info.date, schedule_info.time]);
    } catch (err) {
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
      return await db.one(`UPDATE schedule SET time = time || '{$5}' WHERE id_movie = $1 AND id_cinema = $2 AND id_room = $3 AND date = $4;`, [schedule_info.id_movie, schedule_info.id_cinema, schedule_info.id_room, schedule_info.date, schedule_info.time]);
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },

  //  block seat
  blockSeat: async (id_seat, id_schedule) => {
    try {
      for (let i = 0; i < id_seat.length; i++) {
        let tmp = await db.none(`UPDATE seats SET status = -1  WHERE id_seat =  $1 AND id_schedule = $2;`, [id_seat[i], id_schedule]);
      }
      return "OK";
    } catch (err) {
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
      return await db.one("SELECT id, name FROM users WHERE is_staff = 'false'");
    } catch (err) {
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
      const check = await db.oneOrNone('SELECT * FROM blacklist WHERE id_user = $1', [id_user]);

      if (check !== null) {
        return 'FAIL'; // User is already blacklisted
      }

      await db.none('INSERT INTO blacklist (id_user) VALUES ($1)', [id_user]);

      return 'OK'; // User has been successfully blacklisted
    } catch (err) {
      if (err.code === '0') {
        return null;
      } else {
        throw err;
      }
    }
  },


  // --------------------- ----------- -----------
  registerShifts: async (id_staff, id_shifts) => {
    try {
      // get all shifts full in shifts staff registered for
      const id_fail_shifts = await db.one("SELECT ARRAY_AGG(id) FROM shifts WHERE id = ANY($1) AND ARRAY_LENGTH(id_staffs, 1) >= $2;", [id_shifts,MAX_STAFF_PER_SHIFT]);

      // get all shifts not full and get information of fail shifts
      let id_success_shifts = id_shifts.slice();
      let info_fail_shifts;

      if (id_fail_shifts.array_agg) {
        info_fail_shifts = await db.any("SELECT id, day, time_start, time_end FROM shifts WHERE id = ANY($1);", [id_fail_shifts.array_agg]);

        id_fail_shifts.array_agg.forEach(function (shift) {
          id_success_shifts.splice(id_success_shifts.indexOf(shift), 1);
        });
      }

      // insert shifts not full yet for staff
      await db.none(
        ` UPDATE shifts
          SET id_staffs = CASE
            WHEN ARRAY_POSITION(id_staffs, 1) IS NULL THEN id_staffs || '{$1}'
            ELSE id_staffs
          END
          WHERE id = ANY($2);`,
        [id_staff, id_success_shifts]
      );

      // NOTE: staff table not modify yet
      //add shifts to staff table
      id_success_shifts.forEach(async (element) => {
        let addShifts = await db.none(`UPDATE staff SET id_shifts = id_shifts || '{$1}' WHERE id_user = $2 ;`, [element, id_staff]);
      });

      // return result
      if (id_success_shifts.length == id_shifts.length) {
        return { message: "success" };
      } else {
        const info_success_shifts = await db.any("SELECT id, day, time_start, time_end FROM shifts WHERE id = ANY($1);", [id_success_shifts]);

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

  updateSchedule: async (schedule_info) => {
    try {
      const rs = await db.one("SELECT update_schedule($1, $2, $3, $4, $5::TIME WITHOUT TIME ZONE[]) AS status;", [schedule_info.id_movie, schedule_info.id_cinema, schedule_info.id_room, schedule_info.date, schedule_info.time]);

      return rs.status;
    } catch (error) {
      console.log(error);
    }
  },
};
