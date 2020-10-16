const register = require("./register");
const login = require("./login");
const recipe = require("./recipe");
const userProfile = require("./userProfile");
const comment = require("./comment");
const reply = require("./reply");
const editProfile = require("./editProfile");
const searchRecipe = require("./searchRecipe");
const verifyAccount = require("./verifyAccount");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");

module.exports = function (app) {
  app.use("/api/register", register);
  app.use("/api/login", login);
  app.use("/api/recipe", recipe);
  app.use("/api/profile", userProfile);
  app.use("/api/comment", comment);
  app.use("/api/reply", reply);
  app.use("/api/editProfile", editProfile);
  app.use("/api/search", searchRecipe);
  app.use("/api/verifyAccount", verifyAccount);
  app.use("/api/forgotPassword", forgotPassword);
  app.use("/api/resetPassword", resetPassword);
};
