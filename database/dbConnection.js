const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/meetingappDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database Connection Error"));
