const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const createError = require("http-errors");
const authMiddleware = require("../middleware/auth-mw");
const { BadRequest } = require("http-errors");

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw createError.BadRequest("Invalid id");
    const user = await User.findById(id)
      .populate("followers", "username email")
      .populate("following", "username email")
      .populate("eventsID", "name");
    res.send(user);
  } catch (error) {
    next(error);
  }
});
// Example  POST api/users/follow   { target_id : 'id of the target user'}
router.post("/follow", authMiddleware, async (req, res, next) => {
  try {
    const sourceId = req.user._id;
    const targetId = req.body.target_id;
    //console.log(typeof sourceId, typeof targetId);
    if (sourceId == targetId) {
      throw createError.BadRequest("You cannot follow yourself");
    }
    const query = {
      _id: sourceId,
      following: { $not: { $elemMatch: { $eq: targetId } } },
    };
    const update = {
      $addToSet: { following: targetId },
    };

    const updated = await User.updateOne(query, update);

    const secondQuery = {
      _id: targetId,
      followers: { $not: { $elemMatch: { $eq: sourceId } } },
    };
    const secondUpdate = {
      $addToSet: { followers: sourceId },
    };
    const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

    if (!updated || !secondUpdated) {
      throw createError.BadRequest("Unable to follow");
    }
    res.send(updated);
  } catch (error) {
    next(error);
  }
});
// Unfollow user by id
router.post("/unfollow", authMiddleware, async (req, res, next) => {
  try {
    const sourceId = req.user._id;
    const targetId = req.body.target_id;
    //console.log(typeof sourceId, typeof targetId);
    if (sourceId == targetId) {
      throw createError.BadRequest("You cannot unfollow yourself");
    }
    const query = {
      _id: sourceId,
      following: { $elemMatch: { $eq: targetId } },
    };
    const update = {
      $pull: { following: targetId },
    };

    const updated = await User.updateOne(query, update);

    const secondQuery = {
      _id: targetId,
      followers: { $elemMatch: { $eq: sourceId } },
    };
    const secondUpdate = {
      $pull: { followers: sourceId },
    };
    const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

    if (!updated || !secondUpdated) {
      throw createError.BadRequest("Unable to unfollow");
    }
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
