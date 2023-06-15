const db = require("../../config/connect_db");

module.exports = {
  getProvinces: async () => {
    try {
      const rs = await db.any("SELECT province FROM cinemas WHERE id = ANY(SELECT DISTINCT ON (province) id FROM cinemas) ORDER BY id;");
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getCinemasByProvince: async (province) => {
    try {
      const rs = await db.any("SELECT id, name FROM cinemas WHERE province = $1;", [province]);
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getCinemaDetail: async (id_cinema, date) => {
    try {
      const info_cinema = await db.one("SELECT * FROM cinemas WHERE id = $1;", [id_cinema]);
      let cinema_movies = [];

      const current_movies = await db.one("SELECT ARRAY(SELECT id FROM movies WHERE release_date <= CURRENT_DATE and release_date >= CURRENT_DATE - 30)");
      for (let i = 0; i < current_movies.array.length; i++) {
        const info_movie = await db.one("SELECT id, title, url_poster FROM movies WHERE id = $1;", [current_movies.array[i]]);

        await db.none("CALL generate_schedule($1, COALESCE($2, CURRENT_DATE));", [current_movies.array[i], date]);

        const schedule = await db.any("SELECT _s.id, _r.name, _s.date AT TIME ZONE 'UTC' AT TIME ZONE 'GMT+7' AS date, _s.time FROM schedule _s JOIN rooms _r ON _s.id_room = _r.id WHERE _s.date = COALESCE($1, CURRENT_DATE) AND _s.id_movie = $2 AND _s.id_cinema = $3", [date, current_movies.array[i], id_cinema]);

        let schedule_movie = [];
        for (let j = 0; j < schedule.length; j++) {
          schedule_movie.push({
            id_schedule: schedule[j].id,
            room_name: schedule[j].name,
            date: schedule[j].date,
            time: schedule[j].time,
          });
        }

        cinema_movies.push({
          id_movie: info_movie.id,
          title_movie: info_movie.title,
          movie_poster: info_movie.url_poster,
          schedule: schedule_movie,
        });
      }

      return {
        id: info_cinema.id,
        name: info_cinema.name,
        province: info_cinema.province,
        location: info_cinema.location,
        movies: cinema_movies,
      };
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getSchedule: async (id_movie, date, province) => {
    try {
      await db.none("CALL generate_schedule($1, COALESCE($2, CURRENT_DATE));", [id_movie, date]);
      const rs = await db.any("SELECT _s.id, _s.id_movie, _s.id_cinema, _c.name AS cinema_name, _s.id_room, _r.name AS room_name, _s.date AT TIME ZONE 'UTC' AT TIME ZONE 'GMT+7' AS date, _s.time FROM schedule _s JOIN cinemas _c ON _s.id_cinema = _c.id JOIN rooms _r ON _s.id_room = _r.id WHERE id_movie = $1 AND date = COALESCE($2, CURRENT_DATE) AND province = $3;", [id_movie, date, province]);

      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getSeats: async (id_schedule, time) => {
    try {
      await db.none("CALL get_seat($1, $2);", [id_schedule, time]);
      const rs = await db.any(
        `
        SELECT	id_seat,
                id_schedule, 
                (CASE
                  WHEN (id_seat - 1) / 20 = 14 THEN chr(65 + (id_seat - 1) / 20 + 1) || (id_seat - 1) % 20 + 1
                  ELSE chr(65 + (id_seat - 1) / 20) || mod(id_seat - 1, 20) + 1
                END) AS name,
                status
        FROM	seats
        WHERE	id_schedule = $1 AND time = $2
        ORDER BY id_seat ASC;
      `,
        [id_schedule, time]
      );
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getFoodDrink: async () => {
    try {
      const rs = await db.any("SELECT * FROM food_drink");
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getTicketPrice: async (ticketInfo) => {
    try {
      const rs = await db.one("SELECT real_price($1, $2, $3, $4) AS price", [ticketInfo.date, ticketInfo.time, ticketInfo.user_dob, ticketInfo.id_room]);
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  bookTickets: async (bookInfo) => {
    try {
      const rs = await db.none("INSERT INTO book (id_user, id_seats, id_schedule, id_food_drink, start_time, purchase_date) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE);", [bookInfo.id_user, bookInfo.id_seats, bookInfo.id_schedule, bookInfo.id_food_drink, bookInfo.start_time]);
      await db.none("UPDATE seats SET status = 1 WHERE id_seat = ANY($1) AND id_schedule = $2 AND time = $3", [bookInfo.id_seats, bookInfo.id_schedule, bookInfo.start_time]);
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
  getNewestBook: async (id_user) => {
    try {
      const rs = await db.one("SELECT * FROM get_booking_history($1) LIMIT 1;", [id_user]);
      return rs;
    } catch (err) {
      if (err.code === 0) {
        return null;
      } else {
        throw err;
      }
    }
  },
};
