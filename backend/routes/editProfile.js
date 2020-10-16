const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models/user");
const multer = require("multer");
const { storage } = require("../config/multerConfig");
const { verification } = require("../middlewares/verification");
const Joi = require("@hapi/joi");

const validate = (user) => {
  const schema = Joi.object({
    username: Joi.string().required("username is required").min(3).max(30),
  });
  return schema.validate(user);
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("profile_pic");

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verification,
  upload,
  async (req, res) => {
    const { error } = validate(req.body);

    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    let user = await User.findById({ _id: req.params.id });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found!" });

    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Profile pic required!" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        profilePic: req.file.path,
      },
      { new: true }
    );

    await user.save();
    const token = user.generateAuthToken();
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        profilePic: user.profilePic,
        token: token,
      },
    });
  }
);

module.exports = router;
