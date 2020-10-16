const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../models/user");

const options = {
  secretOrKey: process.env.AUTH_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = passport.use(
  new JwtStrategy(options, async (payload, done) => {
    User.findOne({ _id: payload._id })
      .then((user) => {
        if (user) return done(null, user);
        else return done(null, false);
      })
      .catch((err) => done(err, false));
  })
);
