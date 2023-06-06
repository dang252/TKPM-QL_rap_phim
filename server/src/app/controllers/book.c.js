const bookModel = require("../models/book.m");

const bookController = {
  // [GET] /provinces
  getProvinces: async (req, res) => {
    try {
      const provinces = await bookModel.getProvinces();

      res.status(200).json(provinces);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /provinces
  getCinemas: async (req, res) => {
    try {
      const cinemas = await bookModel.getCinemasByProvince(req.body.province);

      res.status(200).json(cinemas);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] /cinema?id_cinema={}
  getCinemaDetail: async (req, res) => {
    try {
      const cinema_detail = await bookModel.getCinemaDetail(req.query.id_cinema, req.query.date || null);

      res.status(200).json(cinema_detail);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /schedule
  getSchedule: async (req, res) => {
    try {
      const schedule = await bookModel.getSchedule(req.body.id_movie, req.body.date || null, req.body.province || "Hồ Chí Minh");

      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] /seat?id_schedule={}
  getSeats: async (req, res) => {
    try {
      const seats = await bookModel.getSeats(req.query.id_schedule);

      res.status(200).json(seats);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] /food_drink
  getFoodDrink: async (req, res) => {
    try {
      const food_drink = await bookModel.getFoodDrink();

      res.status(200).json(food_drink);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /ticket_price
  getTicketPrice: async (req, res) => {
    try {
      const ticket_info = {
        date: req.body.date,
        time: req.body.time,
        user_dob: req.body.user_dob,
        id_room: req.body.id_room,
      };
      const ticket_price = await bookModel.getTicketPrice(ticket_info);

      res.status(200).json(ticket_price);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /bookTickets
  postBook: async (req, res) => {
    try {
      const book_info = {
        id_user: req.body.id_user,
        id_seats: req.body.id_seats,
        id_schedule: req.body.id_schedule,
        id_food_drink: req.body.id_food_drink,
        start_time: req.body.start_time,
      };
      await bookModel.bookTickets(book_info);

      const newest_book_info = await bookModel.getNewestBook(req.body.id_user);

      res.status(200).json(newest_book_info);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = bookController;
