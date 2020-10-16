const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 300,
    trim: true,
  },
  images: {
    type: ["String"],
    require: true,
    validate: [
      {
        validator: function (v) {
          return v.length >= 3;
        },
        message: (props) => `${props.value} should contain at least 3 images!`,
      },
      {
        validator: function (v) {
          return v.length <= 5;
        },
        message: (props) =>
          `${props.value} should not contain more than 5 images!`,
      },
    ],
  },
  ingredients: {
    type: [String],
    required: true,
    validate: [
      {
        validator: function (v) {
          return v.length >= 1;
        },
        message: (props) =>
          `${props.value} should contain at least 1 ingredients!`,
      },
      {
        validator: function (v) {
          return v.length <= 100;
        },
        message: (props) =>
          `${props.value} should not contain these many ingredients!`,
      },
    ],
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
    trim: true,
  },
  directions: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 7000,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const validateRecipe = (recipe) => {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(300),
    ingredients: Joi.array()
      .min(1)
      .max(30)
      .items(Joi.string().min(3).max(100))
      .required(),
    description: Joi.string().required().min(10).max(1000),
    directions: Joi.string().required().min(20).max(7000),
  });
  return schema.validate(recipe);
};

module.exports.Recipe = Recipe;
module.exports.validate = validateRecipe;
