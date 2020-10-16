require("dotenv").config();
require("express-async-errors");
const error = require("./middlewares/error");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const path = require('path');
const winston = require("winston");
require("./config/db")();
require("./config/cloudinaryConfig")();
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("./uploads"));
app.use(passport.initialize());
require("./config/passport");
require("./config/prod")(app);
require("./routes")(app);
app.use(error);
require("./config/logging")();

app.listen(process.env.PORT, () =>
  winston.info(`listening on ${process.env.HOST}:${process.env.PORT}`)
);
