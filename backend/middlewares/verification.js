module.exports.verification = async (req, res, next) => {
  const isverified = req.user.verified;
  if (isverified) next();
  else
    return res
      .status(401)
      .json({ success: false, message: "user account not verified" });
};
