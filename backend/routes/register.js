const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/multerConfig");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
// const cloudinary = require("cloudinary").v2;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

router.post("/", upload.single("profile_pic"), async (req, res) => {
  console.log("in req file", req.file);
  req.body = req.body.data || req.body;
  const { username, email, password, ...rest } = req.body;
  const { error } = validate({ username, email, password });
 

  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  if (!req.file)
    return res
      .status(400)
      .send({ success: false, message: "Profile pic required!" });


  let user = await User.findOne({
    email: email,
  });

  if (user)
    return res.status(400).json({
      success: false,
      message: "user already registered!",
    });

  user = new User({
    username: username,
    email: email,
    password: password,
    profilePic: req.file.path,
  });
  //hashing password
  user.password = await user.hashPassword(user.password);
  await user.save();

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.AUTH_KEY
  );

  const msg = {
    to: req.body.email,
    from: "rishabkumar24@gmail.com",
    subject: "Verification Email",
    html: `<p>Please click the link below to activate your account</p><br><a href="${process.env.CLIENT_URL}/verifyAccount/${token}" target="_blank">${process.env.CLIENT_URL}/verifyAccount/${token}</a>`,
  };
  try {
    sgMail.send(msg);
  } catch (err) {
    console.log("err", err);
  }

  res.status(200).json({
    message:
      "verfication email sent. please verify your account by clicking on link",
  });
});

module.exports = router;
