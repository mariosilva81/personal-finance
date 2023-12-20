const express = require("express");
require("express-async-errors");
const { json } = require("express");
const { errorHandler } = require("./errors/index.js");
const {
  categoriesRouter,
  loginRouter,
  transactionsRouter,
  usersRouter,
} = require("./routers/index.js");

const app = express();

app.use(json());

app.use("/categories", categoriesRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

app.use(errorHandler);

module.exports = app;
