const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require("http-errors");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) throw createError.Unauthorized();
    const token = authHeader.replace("Bearer ", "");
    const verify = jwt.verify(token, "SECRET");
    const userId = verify.user;
    req.user = await User.findById({ _id: userId });
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = auth;
