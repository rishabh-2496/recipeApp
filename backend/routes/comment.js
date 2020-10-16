const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentController = require("../controllers/commentController");
const { verification } = require("../middlewares/verification");

router.get("/", commentController.comments_list);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  verification,
  commentController.comment_create
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verification,
  commentController.comment_update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verification,
  commentController.comment_delete
);

router.get("/:id", commentController.get_comment);

module.exports = router;
