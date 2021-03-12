const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const userRoute = require("./users");
const eventRoute = require("./events");
const groupRoute = require("./groups");

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/events", eventRoute);
router.use("/groups", groupRoute);

module.exports = router;
