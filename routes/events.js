const router = require("express").Router();
const Event = require("../models/Event");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth-mw");
const { uploadEvent } = require("../middleware/file-upload");

router.get("/", (req, res) => {
  res.send("Event");
});

// Get nearest events
// Route : api/events/near?long=XXX&lat=XXX (optional)&distance=XXX
// optinal paramaters: distance
router.get("/near", async (req, res, next) => {
  try {
    const events = await Event.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(req.query.long),
              parseFloat(req.query.lat),
            ],
          },
          distanceField: "dist.calculated",
          maxDistance: req.query.distance
            ? parseFloat(req.query.distance)
            : 100000,
          spherical: true,
        },
      },
    ]);

    res.send(events);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Create Event
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const newEvent = new Event(req.body);
    newEvent.creatorID = userId;
    const result = await newEvent.save();
    const userResult = await User.findByIdAndUpdate(
      userId,
      { $push: { eventsID: result._id } },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get event by id
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id)
      .populate("participants", "username")
      .populate("creatorID", "username");
    res.send(event);
  } catch (error) {
    next(error);
  }
});

// PATCH api/events/:id/photos
// Add cover photo to event
// TODO make multiple image upload
router.patch(
  "/:id/photos",
  [authMiddleware, uploadEvent.single("cover")],
  async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.user._id;
      const event = await Event.findByIdAndUpdate(
        eventId,
        { cover_url: req.file.path },
        { new: true }
      );
      res.send(event);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
