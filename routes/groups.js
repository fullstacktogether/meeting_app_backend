const router = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth-mw");

// GET api/groups/
// GET lastly created 20 groups
router.get("/", async (req, res) => {
  const groups = await Group.find()
    .sort("-createdAt")
    .select(["name", "description"])
    .limit(20);
  res.send(groups);
});

// POST api/groups/
// Create new group from req body.
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const newGroup = new Group(req.body);
    newGroup.creatorID = userId;
    newGroup.members.push(userId);
    const result = await newGroup.save();
    User.findByIdAndUpdate(userId, {
      $addToSet: { groupsID: newGroup._id },
    }).exec();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// GET api/groups/:id
// Get Group by specific id.
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    //const user = req.user._id;
    const group = await Group.findById(id)
      .populate("members", "username")
      .populate("creatorID", "username");
    res.send(group);
  } catch (error) {
    next(error);
  }
});

// PATCH api/groups/:id
// Update group metadata.
router.patch("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user._id;
    const g = await Group.findById(id);
    console.log(g.creatorID + user);
    if (g.creatorID.toString() != user.toString()) {
      res.status(400).send("you should be creator to do this");
    } else {
      if (req.body.name) {
        const group = await Group.findByIdAndUpdate(
          id,
          {
            name: req.body.name,
            description: req.body.description,
          },
          {
            new: true,
          }
        );
        res.send(group);
      } else {
        // TODO: Add black list feature to groups then admins can add users to blacklist
        //
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
