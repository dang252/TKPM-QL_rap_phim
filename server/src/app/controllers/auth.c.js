const userModel = require("../models/user.m");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = [];

const authController = {
  // generate JWT_ACCESS_TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        userId: user.id,
        // is_staff: user.is_staff,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  // generate JWT_REFRESH_TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        userId: user.id,
        // is_staff: user.is_staff,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "2d" }
    );
  },

  // [POST] /register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(11);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create new user
      const user = {
        password: hashed,
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
      };

      // save user to database
      const { password, ...others } = await userModel.addUser(user);

      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /login
  loginUser: async (req, res) => {
    try {
      // get user from database
      const user = await userModel.getUserByUsername(req.body.username);

      if (user == null) {
        return res.status(404).json("Account doesn't exist!");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password!");
      } else {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "none",
        });

        const { password, ...others } = user;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // [POST] /refresh
  requestRefreshToken: async (req, res) => {
    // take refresh token from user
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json("401 Unauthorized!");

    // check if we have a refresh token but it isn't our refresh token
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("403 Forbidden!");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }

      // delete old refresh token
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      // create new JWT_ACCESS_TOKEN and JWT_REFRESH_TOKEN
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // [POST] /logout
  logoutUser: async (req, res) => {
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
