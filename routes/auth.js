const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const authMiddleware = require("../middleware/auth-mw");
const upload = require("../middleware/file-upload");

router.get("/", (req, res) => {
  res.send("Auth");
});

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    const token = jwt.sign({ user: user._id }, "SECRET", {
      expiresIn: "365 days",
    });
    res.json({ user: result._id, token: token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw createError.NotFound("User not found");
    const isMatch = await user.isValidPassword(req.body.password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");
    const token = jwt.sign({ user: user._id }, "SECRET", {
      expiresIn: "365 days",
    });
    res.send({ token: token });
  } catch (error) {
    next(error);
  }
});

router.get("/me", authMiddleware, async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("followers", "username")
    .populate("following", "username")
    .populate("eventsID", "name")
    .populate("groupsID", "name");
  res.send(user);
});

// Route : auth/me
// Method : PATCH
// Change username or avatar of authenticated user
router.patch(
  "/me",
  [authMiddleware, upload.single("avatar")],
  async (req, res, next) => {
    try {
      const userId = req.user._id;
      const newUsername = req.body.username;
      if (newUsername) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { username: newUsername },
          {
            new: true,
            runValidators: true,
          }
        );
        res.send(updatedUser);
      } else {
        const user = await User.findByIdAndUpdate(
          userId,
          { avatar_url: req.file.path },
          { new: true }
        );
        res.send(user);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
