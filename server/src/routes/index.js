const authRouter = require("./auth.r");
const userRouter = require("./user.r");

function router(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
}

module.exports = router;
