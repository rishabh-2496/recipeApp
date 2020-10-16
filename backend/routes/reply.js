const express = require("express");
const router = express.Router();
const passport = require("passport");
const replyController = require("../controllers/replyController");
const { verification } = require("../middlewares/verification");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  verification,
  replyController.reply
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verification,
  replyController.update_reply
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verification,
  replyController.delete_reply
);

module.exports = router;
