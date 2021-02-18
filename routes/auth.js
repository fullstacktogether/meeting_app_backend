const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

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

module.exports = router;
