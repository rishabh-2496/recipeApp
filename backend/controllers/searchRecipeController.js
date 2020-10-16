const { Recipe } = require("../models/recipe");

module.exports.findRecipe = async function (req, res, next) {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  if (!page) return res.status(400).json({ message: "page no missing" });
  if (!limit || limit > 10) limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let results = {};

  const recipeSearchCount = await Recipe.find({
    name: { $regex: req.query.q, $options: "i" },
  }).countDocuments();

  if (endIndex < recipeSearchCount) {
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

  if (!req.query.q)
    return res
      .status(400)
      .json({ success: false, message: "not valid query string" });

  let recipe = await Recipe.aggregate([
    {
      $match: {
        name: { $regex: req.query.q, $options: "i" },
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

  results.recipes = recipe;

  res.status(200).json({ success: true, searchResults: results });
};
