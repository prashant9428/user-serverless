const express = require("express");
require("express-async-errors");
const errorHandler = require("../src/middleware/error");
const router = require("../src/routes/user");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(router);
app.use(errorHandler);

//app.listen("3000", () => console.log("running"))

module.exports = app;
