const { logger } = require("../config/logging");

module.exports = function (err, req, res, next) {
  if (err && err.name == "MulterError") {
    return res.status(400).send({ message: err.message });
  }
  logger.log("error", err);
  res.status(500).send("something wrong!");
  next();
};
