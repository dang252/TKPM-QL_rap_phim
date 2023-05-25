const db = require("../../config/connect_db");

module.exports = {
  getSchedule: async (id_movie, date) => {
    try {
      const rs = await db.any("SELECT id, id_movie, id_cinema, id_room, date AT TIME ZONE 'UTC' AT TIME ZONE 'GMT+7' AS date, time FROM schedule WHERE id_movie = $1 AND date = $2;", [id_movie, date]);
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
      const rs = await db.any("SELECT id_seat, id_schedule, (chr(65 + (id_seat - 1) / 20) || (id_seat - 1) % 20 + 1) AS name, status FROM seats WHERE id_schedule = $1;", [id_schedule]);
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
      const rs = await db.one("INSERT INTO book (id_user, id_seats, id_schedule, id_food_drink, start_time, purchase_date) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) RETURNING *;", [bookInfo.id_user, bookInfo.id_seats, bookInfo.id_schedule, bookInfo.id_food_drink, bookInfo.start_time]);
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
