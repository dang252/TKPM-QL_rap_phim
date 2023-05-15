const userModel = require("../models/user.m");

const userController = {
  // [GET] /profile?id={id}
  getProfile: async (req, res) => {
    try {
      const infoUser = await userModel.getUserByID(req.query.id);

      const { password, ...others } = infoUser;

      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
