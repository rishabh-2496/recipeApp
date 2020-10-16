const mongoose = require("mongoose");
const winston = require("winston");
const { logger } = require("./logging");
module.exports = function () {
  mongoose
    .connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => winston.info("mongodb connected"))
    .catch((err) => logger.log("error", err));
};
