const { validate, Comment } = require("../models/comment");
const { User } = require("../models/user");
const { Recipe } = require("../models/recipe");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateCommentUpdate = (comment) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(10).max(2000).required(),
  });
  return schema.validate(comment);
};

module.exports.comment_create = async function (req, res, next) {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  let user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).json({ success: false, message: "user not found!" });

  let recipe = await Recipe.findById(req.body.recipeId);
  if (!recipe)
    return res
      .status(404)
      .json({ success: false, message: "recipe not found!" });

  let comment = await Comment.find({
    $and: [{ userId: req.user._id }, { recipeId: req.body.recipeId }],
  });

  if (comment.length > 0)
    return res
      .status(400)
      .json({ success: false, message: "users already posted rating" });

  comment = new Comment({
    rating: req.body.rating,
    comment: req.body.comment,
    recipeId: req.body.recipeId,
    userId: req.user._id,
  });

  comment = await comment.save();
  res.status(200).json({ success: true, comment: comment });
};

module.exports.comments_list = async function (req, res, next) {
  if (!req.query.recipeId)
    res.status(400).json({
      success: false,
      message: "recipe id required",
    });

  const comments = await Comment.find({
    recipeId: req.query.recipeId,
  }).deepPopulate("userId replies.userId");

  res.status(200).json({
    success: true,
    comments: comments,
  });
};

module.exports.comment_update = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid mongodb id");

  const { error } = validateCommentUpdate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: "false", message: error.details[0].message });

  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({
      success: "false",
      message: "comment not found",
    });
  }

  if (!comment.user.equals(req.user._id)) {
    return res
      .status(400)
      .json({ success: false, message: "user is not allowed to update" });
  }

  comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      rating: req.body.rating,
      comment: req.body.comment,
    },
    { new: true }
  );

  await comment.save();
  res
    .status(200)
    .json({ success: true, comment: comment, message: "updated succesfully" });
};

module.exports.comment_delete = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid mongodb id");

  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({
      success: "false",
      message: "comment not found",
    });
  }

  if (!comment.user.equals(req.user._id))
    return res
      .status(400)
      .json({ success: false, message: "user is not allowed to delete" });

  comment = await Comment.findByIdAndRemove(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "deleted succesfully", comment: comment });
};

module.exports.get_comment = async function (req, res, next) {
  const comment = await Comment.findById(req.params.id);
  if (!comment)
    return res.status(404).json({
      success: "false",
      message: "comment not found",
    });
  res.status(200).send(comment);
};
