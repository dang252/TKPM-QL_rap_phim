const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swaggerConfig");

const port = 5000;
const app = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://tkpm-ql-rap-phim.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `https://tkpm-ql-rap-phim.vercel.app`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
