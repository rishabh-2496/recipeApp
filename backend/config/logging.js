require("express-async-errors");
const { createLogger, format, transports, exceptions } = require("winston");
const { combine, timestamp, prettyPrint, errors, colorize } = format;
require("winston-mongodb");

module.exports = function () {
  exceptions.handle(
    new transports.Console({ prettyPrint: true }),
    new transports.File({ filename: "uncaughtexceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};

module.exports.logger = createLogger({
  level: "error",
  format: combine(timestamp(), prettyPrint(), colorize()),
  transports: [
    new transports.File({ filename: "logfile.log" }),
    new transports.MongoDB({
      db: process.env.DB,
      metaKey: "metadata",
    }),
  ],
});
