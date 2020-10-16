const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const deepPopulate = require("mongoose-deep-populate")(mongoose);

const commentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    min: 10,
    max: 2000,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replies: [
    {
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reply: "String",
    },
  ],
});

commentSchema.plugin(deepPopulate, {
  populate: {
    userId: {
      select: "username profilePic",
    },
    "replies.userId": {
      select: "username profilePic",
    },
  },
});

const Comment = mongoose.model("Comment", commentSchema);

const validateComment = (comment) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(10).max(2000).required(),
    recipeId: Joi.objectId().required(),
  });
  return schema.validate(comment);
};

module.exports.Comment = Comment;
module.exports.validate = validateComment;
