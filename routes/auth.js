const router = require("express").Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("Auth");
});

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
