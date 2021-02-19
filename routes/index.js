const express = require("express");
const authRoute = require("./auth");
const userRoute = require("./users");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);

module.exports = router;
