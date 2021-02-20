const express = require("express");
const authRoute = require("./auth");
const userRoute = require("./users");
const eventRoute = require("./events")
const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/events", eventRoute);

module.exports = router;
