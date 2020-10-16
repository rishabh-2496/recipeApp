const Joi = require("@hapi/joi");
const { User } = require("../models/user");
const { Comment } = require("../models/comment");
const { Reply } = require("../models/comment");
const mongoose = require("mongoose");

const validateReply = (reply) => {
  const schema = Joi.object({
    commentId: Joi.objectId().required(),
    reply: Joi.string().required().min(3).max(255),
  });
  return schema.validate(reply);
};

const validateReplyUpdate = (reply) => {
  const schema = Joi.object({
    reply: Joi.string().required().min(3).max(255),
  });
  return schema.validate(reply);
};

module.exports.reply = async function (req, res, next) {
  const { error } = validateReply(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  let user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).json({ success: false, message: "user not found!" });

  let comment = await Comment.findById(req.body.commentId);
  if (!comment)
    return res
      .status(404)
      .json({ success: false, message: "comment not found!" });

  comment.replies.push({
    commentId: req.body.commentId,
    userId: req.user._id,
    reply: req.body.reply,
  });

  await comment.save();
  res.status(200).json({ success: true, comment: comment });
};

module.exports.update_reply = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid mongodb id");

  const { error } = validateReplyUpdate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  let reply = await Comment.findOneAndUpdate(
    {
      "replies._id": req.params.id,
    },
    {
      $set: {
        "replies.$.reply": req.body.reply,
      },
    },
    { new: true }
  );

  if (!reply)
    return res
      .status(404)
      .json({ success: false, message: "reply not found!" });

  res.status(200).send({ success: true, replies: reply.replies });
};

module.exports.delete_reply = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid mongodb id");

  let reply = await Comment.findOneAndUpdate(
    { "replies._id": req.params.id },
    { $pull: { replies: { _id: req.params.id } } },
    { new: true }
  );

  if (!reply)
    return res
      .status(404)
      .json({ success: false, message: "reply not found!" });

  res.status(200).send({
    success: true,
    replies: reply.replies,
    message: "deleted succesfully",
  });
};
