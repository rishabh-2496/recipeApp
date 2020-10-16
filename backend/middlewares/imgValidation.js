module.exports.imageValidationMiddleware = (req, res, next) => {
  if (!req.files) {
    return res
      .status(400)
      .json({ success: false, message: "min 3 images required" });
  }
  if (req.files.length < 3) {
    return res
      .status(400)
      .json({ success: false, message: "min 3 images required" });
  } else if (req.files.length > 5) {
    return res
      .status(400)
      .json({ success: false, message: "max 5 images required" });
  }
  next();
};
