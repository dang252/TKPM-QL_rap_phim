const userModel = require("../models/user.m");

const bcrypt = require("bcrypt");

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

      const { password, ...others } = updatedInfoUser;

      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /profile
  changePassword: async (req, res) => {
    try {
      // check old password
      const user = await userModel.getUserByID(req.body.id);
      const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!validPassword) {
        return res.status(400).json("Incorrect Old Password!");
      } else {
        // hash password
        const salt = await bcrypt.genSalt(11);
        const hashedNewPass = await bcrypt.hash(req.body.newPassword, salt);

        // create user with new password
        const infoUser = {
          id: req.body.id,
          password: hashedNewPass,
        };

        await userModel.changePassword(infoUser);
        return res.status(200).json("Change Password Successfully!");
      }
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

  // [DELETE] /delete_history?id_book={id_book}
  deleteHistory: async (req, res) => {
    try {
      const rs = await userModel.deleteHistory(req.query.id_book);
      if (!rs) {
        return res.status(409).json("Can't delete this before the movie screening!");
      }
      res.status(200).json("Delete Successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [DELETE] /delete_account?id_user={id_user}&password={password}
  deleteAccount: async (req, res) => {
    try {
      // get user by id
      console.log(req.query.id_user, typeof req.query.id_user, req.query.password, typeof req.query.password);
      const user = await userModel.getUserByID(req.query.id_user);

      // check password
      const validPassword = await bcrypt.compare(req.query.password, user.password);

      // send response
      if (!validPassword) {
        return res.status(401).json("Wrong Password!");
      } else {
        await userModel.deleteAccount(req.query.id_user, req.query.password);
        return res.status(200).json("Delete Successfully!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
