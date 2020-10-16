const express = require("express");
const router = express.Router();
const passport = require("passport");
const userProfileController = require("../controllers/userProfileController");
const { Recipe } = require("../models/recipe");
const { pagination } = require("../middlewares/pagination");

router.get("/:id", pagination(Recipe), userProfileController.get_profile);

module.exports = router;
