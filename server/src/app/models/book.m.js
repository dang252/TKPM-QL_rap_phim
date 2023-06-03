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
  getCinemaDetail: async (id_cinema) => {
    try {
      const info_cinema = await db.one("SELECT * FROM cinemas WHERE id = $1;", [id_cinema]);
      const cinema_schedule = await db.any("SELECT _s.id, _m.title AS movie_title, _m.url_poster AS movie_poster, _r.name AS room_name, _s.date, _s.time FROM schedule _s JOIN movies _m ON _s.id_movie = _m.id JOIN rooms _r ON _s.id_room = _r.id WHERE id_cinema = $1;", [id_cinema]);

      return {
        id: info_cinema.id,
        name: info_cinema.name,
        province: info_cinema.province,
        location: info_cinema.location,
        schedule: cinema_schedule,
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
      await db.none("CALL generate_schedule($1, $2);", [id_movie, date]);
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
  getSeats: async (id_schedule) => {
    try {
      await db.none("CALL get_seat($1);", [id_schedule]);
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
        WHERE	id_schedule = $1
        ORDER BY id_seat ASC;
      `,
        [id_schedule]
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
      await db.none("UPDATE seats SET status = 1 WHERE id_seat = ANY($1) AND id_schedule = $2", [bookInfo.id_seats, bookInfo.id_schedule]);
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
