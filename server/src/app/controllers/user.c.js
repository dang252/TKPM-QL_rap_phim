const userModel = require("../models/user.m");

const userController = {
  // [GET] /profile?id={id_user}
  getProfile: async (req, res) => {
    try {
      const infoUser = await userModel.getUserByID(req.query.id);

      const { password, ...others } = infoUser;

      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /profile
  updateProfile: async (req, res) => {
    try {
      const infoUser = {
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
      };

      const updatedInfoUser = await userModel.updateProfile(infoUser);

      res.status(200).json(updatedInfoUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /profile
  changePassword: async (req, res) => {
    try {
      const infoUser = {
        id: req.body.id,
        password: req.body.password,
      };
      const updatedInfoUser = await userModel.changePassword(infoUser);

      const { password, ...others } = updatedInfoUser;

      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [GET] /booking_history?id={id_user}
  getBookingHistory: async (req, res) => {
    try {
      const bookingHistory = await userModel.bookingHistory(req.query.id);

      res.status(200).json(bookingHistory);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
