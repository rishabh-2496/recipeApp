const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");


const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().required("email is required").email(),
    password: Joi.string().required("password is required").min(8).max(30),
  });
  return schema.validate(user);
};

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ succes: false, message: "invalid email or password" });

  if (!user.verified)
    return res.status(401).json({
      success: false,
      message: "user account not verified",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      succes: false,
      message: "invalid email or password",
    });

  const token = user.generateAuthToken();
  res.status(200).json({ success: true, token: token });
});

module.exports = router;
