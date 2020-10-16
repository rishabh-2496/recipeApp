const express = require("express");
const router = express.Router();
const searchRecipeController = require("../controllers/searchRecipeController");

router.get("/", searchRecipeController.findRecipe);

module.exports = router;
