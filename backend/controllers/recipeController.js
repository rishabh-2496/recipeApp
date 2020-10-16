const { Recipe, validate } = require("../models/recipe");
const { User } = require("../models/user");
const mongoose = require("mongoose");

module.exports.recipe_create = async function (req, res, next) {
  const { name, description, directions, ingredients, ...rest } = req.body;
  const { error } = validate({ name, description, directions, ingredients });

  if (error)
    return res
      .status(400)
      .json({ success: "false", message: error.details[0].message });

  const user = await User.findOne({ _id: req.user._id });
  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "author not found!" });

  const imagesPath = req.files.map((file) => file.path);

  let recipe = await Recipe.findOne({ name: name });

  if (recipe)
    return res
      .status(400)
      .json({ success: false, message: "recipe with this name already exist" });

  recipe = new Recipe({
    name: name,
    images: imagesPath,
    ingredients: ingredients,
    description: description,
    directions: directions,
    author: user._id,
  });

  recipe = await recipe.save();
  res
    .status(200)
    .json({ success: true, message: "recipe added succesfully", recipe });
};

module.exports.recipe_list = async function (req, res, next) {
  res.status(200).json({ success: true, recipes: res.paginatedResults });
};

module.exports.get_recipe = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid mongodb id");

  let recipe = await Recipe.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "recipeId",
        as: "comments",
      },
    },
    {
      $addFields: {
        ratingAverage: {
          $divide: [
            {
              $reduce: {
                input: "$comments",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.rating"] },
              },
            },
            {
              $cond: [
                { $ne: [{ $size: "$comments" }, 0] },
                { $size: "$comments" },
                1,
              ],
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        _id: 1,
        images: 1,
        ingredients: 1,
        name: 1,
        description: 1,
        directions: 1,
        ratingAverage: 1,
        "author.username": 1,
        "author.profilePic": 1,
        "author._id": 1,
        ratingCount: {
          $size: "$comments",
        },
        createdAt: 1,
      },
    },
    {
      $unwind: "$author",
    },
  ]);

  if (!recipe) return res.status(404).send("recipe with given id not found");
  res.status(200).json({ success: true, recipe: recipe[0] });
};

module.exports.recipe_today = async function (req, res, next) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  if (!page) return res.status(400).json({ message: "page no missing" });
  if (!limit || limit > 10) limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let results = {};

  const todayRecipeCounts = await Recipe.find({
    createdAt: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
  }).countDocuments();

  if (endIndex < todayRecipeCounts) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.recipes = await Recipe.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "recipeId",
        as: "comments",
      },
    },
    {
      $addFields: {
        ratingAverage: {
          $divide: [
            {
              $reduce: {
                input: "$comments",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.rating"] },
              },
            },
            {
              $cond: [
                { $ne: [{ $size: "$comments" }, 0] },
                { $size: "$comments" },
                1,
              ],
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        _id: 1,
        images: 1,
        ingredients: 1,
        name: 1,
        description: 1,
        directions: 1,
        ratingAverage: 1,
        "author.username": 1,
        "author.profilePic": 1,
        ratingCount: {
          $size: "$comments",
        },
        createdAt: 1,
      },
    },
    {
      $unwind: "$author",
    },
    {
      $skip: startIndex,
    },
    {
      $limit: limit,
    },
    {
      $sort: { ratingAverage: -1 },
    },
  ]);

  res.status(200).json({ success: true, results });
};

module.exports.recipe_thisWeek = async function (req, res, next) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  if (!page) return res.status(400).json({ message: "page no missing" });
  if (!limit || limit > 10) limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let results = {};

  const weekRecipeCounts = await Recipe.find({
    createdAt: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
  }).countDocuments();

  if (endIndex < weekRecipeCounts) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.recipes = await Recipe.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "recipeId",
        as: "comments",
      },
    },
    {
      $addFields: {
        ratingAverage: {
          $divide: [
            {
              $reduce: {
                input: "$comments",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.rating"] },
              },
            },
            {
              $cond: [
                { $ne: [{ $size: "$comments" }, 0] },
                { $size: "$comments" },
                1,
              ],
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        _id: 1,
        images: 1,
        ingredients: 1,
        name: 1,
        description: 1,
        directions: 1,
        ratingAverage: 1,
        "author.username": 1,
        "author.profilePic": 1,
        ratingCount: {
          $size: "$comments",
        },
        createdAt: 1,
      },
    },
    {
      $unwind: "$author",
    },
    {
      $skip: startIndex,
    },
    {
      $limit: limit,
    },
    {
      $sort: { ratingAverage: -1 },
    },
  ]);
  res.status(200).json({ success: true, results });
};

module.exports.recipe_thisMonth = async function (req, res, next) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  if (!page) return res.status(400).json({ message: "page no missing" });
  if (!limit || limit > 10) limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let results = {};

  const monthRecipeCounts = await Recipe.find({
    createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
  }).countDocuments();

  if (endIndex < monthRecipeCounts) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.recipes = await Recipe.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "recipeId",
        as: "comments",
      },
    },
    {
      $addFields: {
        ratingAverage: {
          $divide: [
            {
              $reduce: {
                input: "$comments",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.rating"] },
              },
            },
            {
              $cond: [
                { $ne: [{ $size: "$comments" }, 0] },
                { $size: "$comments" },
                1,
              ],
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        _id: 1,
        images: 1,
        ingredients: 1,
        name: 1,
        description: 1,
        directions: 1,
        ratingAverage: 1,
        "author.username": 1,
        "author.profilePic": 1,
        ratingCount: {
          $size: "$comments",
        },
        createdAt: 1,
      },
    },
    {
      $unwind: "$author",
    },
    {
      $skip: startIndex,
    },
    {
      $limit: limit,
    },
    {
      $sort: { ratingAverage: -1 },
    },
  ]);
  res.status(200).json({ success: true, results });
};

module.exports.recipe_delete = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid mongodb id");
  let recipe = await Recipe.findByIdAndRemove(req.params.id).populate("author");
  if (!recipe) return res.status(404).send("recipe with given id not found");
  res.status(200).json({
    success: true,
    recipe: recipe,
    message: "recipe delete succesfully",
  });
};

module.exports.recipe_update = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid mongodb id");
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: "false", message: error.details[0].message });

  const user = await User.findOne({ _id: req.body.author });
  if (!user)
    return res
      .status(404)
      .send({ success: false, message: "author not found!" });

  const imagesPath = req.files.map((file) => file.path);
  let recipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      images: imagesPath,
      ingredients: req.body.ingredients,
      description: req.body.description,
      directions: req.body.directions,
      author: req.body.author,
    },
    { new: true }
  );

  if (!recipe) return res.status(404).send("recipe with given id not found");
  return res
    .status(200)
    .json({ success: true, message: "recipe update succesfully", recipe });
};
