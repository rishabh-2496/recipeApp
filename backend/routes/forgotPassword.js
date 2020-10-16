const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { User } = require("../models/user");

const validate = (body) => {
  const schema = Joi.object({
    email: Joi.string().required("email is required").email(),
  });
  return schema.validate(body);
};

router.put("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(200)
      .json({ success: false, message: error.details[0].message });

  const { email } = req.body;

  let user = await User.findOne({
    email: email,
  });

  if (!user)
    return res.status(400).json({
      success: false,
      message: "user doesn't exist!",
    });

  const token = jwt.sign(
    {
      email: email,
    },
    process.env.AUTH_KEY,
    { expiresIn: 60 * 20 }
  );

  const msg = {
    to: email,
    from: "rishabkumar24@gmail.com",
    subject: "Reset Password Email",
    html: `<p>Please click the link below to reset your password</p><br><a href="${process.env.CLIENT_URL}/resetPassword/${token}" target="_blank">${process.env.CLIENT_URL}/resetPassword/${token}</a>`,
  };
  try {
    sgMail.send(msg);
    res
      .status(200)
      .json({ message: "Reset Password Link Sent To Your E-Mail" });
  } catch (err) {
    console.log("err", err);
  }
});

module.exports = router;
