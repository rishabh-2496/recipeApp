const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validate = (body) => {
  const schema = Joi.object({
    password: Joi.string().required("password is required").min(8).max(30),
    resetToken: Joi.string().required("reset token is required"),
  });
  return schema.validate(body);
};

router.put("/", async (req, res) => {
  const { password, resetToken } = req.body;
  const { error } = validate({ password, resetToken });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  try {
    const decoded = jwt.verify(resetToken, process.env.AUTH_KEY);
    let user = await User.findOneAndUpdate(decoded.email, {
      password: hashedPassword,
    });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "user doesn't exist with this email",
      });

    res
      .status(200)
      .json({ success: true, message: "password reset succesfully" });
  } catch (err) {
    res
      .status(400)
      .json({ sucess: false, message: "invalid or expired token" });
  }
});

module.exports = router;
