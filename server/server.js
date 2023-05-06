const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const account = require("./db/account.json");

//========== APP settings

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//========== App middleware
const auth = (req, res, next) => {
  const { token } = req.body;
  if (token == "abc123456") {
    next();
  } else {
    res.status(401).json({ message: "Auth failed" });
  }
};

//========== App API

app.get("/", (req, res, next) => {
  res.status(200).json("Server run successfully");
});

app.get("/users", (req, res, next) => {
  res.status(200).json(account.users);
});

app.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  const data = {
    message: "success",
    user: {
      username: username,
      password: password,
    },
  };

  res.status(200).json(data);
});

app.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  const [target] = account.users.filter((user) => {
    return user.username === username && user.password === password;
  });

  if (target) {
    const token = "abc123456";

    res.status(200).json({
      message: "success",
      user: target,
      token: token,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.post("/profile", auth, (req, res, next) => {
  const target = account.users[0];
  const { token } = req.body;

  if (target) {
    res.status(200).json({
      message: "success",
      user: target,
      token: token,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.post("/auth", auth, (req, res, next) => {
  const { token } = req.body;

  if (token === "abc123456") {
    res.status(200).json({
      message: "Auth successfully",
    });
  }
});

//========== APP log

app.listen(port, () => {
  console.log(`Listening to port: http://localhost:${port}`);
});
