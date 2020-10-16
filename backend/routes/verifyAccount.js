const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const verificationToken = req.body.token;
  if (!verificationToken)
    return res.status(400).json({ sucess: false, message: "token required" });

  try {
    const decoded = jwt.verify(verificationToken, process.env.AUTH_KEY);
    let user = await User.findByIdAndUpdate(decoded._id, {
      verified: true,
    });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "user doesn't exist" });

    //hashing password
    await user.save();
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: token,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ sucess: false, message: "invalid or expired token" });
  }
});

module.exports = router;
