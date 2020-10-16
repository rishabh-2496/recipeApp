const express = require("express");
const router = express.Router();
const passport = require("passport");
const recipeController = require("../controllers/recipeController");
const multer = require("multer");
const { Recipe } = require("../models/recipe");
const { storage } = require("../config/multerConfig");
const { imageValidationMiddleware } = require("../middlewares/imgValidation");
const { verification } = require("../middlewares/verification");
const { pagination } = require("../middlewares/pagination");

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

router.get("/", pagination(Recipe), recipeController.recipe_list);
router.get("/today", recipeController.recipe_today);
router.get("/thisWeek", pagination(Recipe), recipeController.recipe_thisWeek);
router.get("/thisMonth", pagination(Recipe), recipeController.recipe_thisMonth);
router.get("/:id", recipeController.get_recipe);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  verification,
  upload.array("images", 5),
  imageValidationMiddleware,
  recipeController.recipe_create
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verification,
  upload.array("images", 5),
  imageValidationMiddleware,
  recipeController.recipe_update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verification,
  recipeController.recipe_delete
);

module.exports = router;
