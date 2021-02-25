const mongoose = require("mongoose");
const Event = require("./models/Event");

mongoose
  .connect("mongodb://localhost/meetingappDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database Connection Error"));

const eventList = [
  {
    name: "Fatih",
    location: { coordinates: [28.948051, 41.018808] },
  },
  {
    name: "Üsküdar",
    location: { coordinates: [29.016216, 41.02465] },
  },
  {
    name: "Kars",
    location: { coordinates: [43.098439, 40.60399] },
  },
  {
    name: "Maltepe",
    location: { coordinates: [29.132742, 40.923025] },
  },
  {
    name: "Ümraniye",
    location: { coordinates: [29.089943, 41.022161] },
  },
  {
    name: "Ankara",
    location: { coordinates: [32.854664, 39.920225] },
  },
  {
    name: "Erzurum",
    location: { coordinates: [41.274038, 39.906283] },
  },
  {
    name: "Eskişehir",
    location: { coordinates: [30.52513, 39.765695] },
  },
  {
    name: "Kocaeli",
    location: { coordinates: [29.94045, 40.763555] },
  },
];

Event.collection.insertMany(eventList, onInsert);

function onInsert(err) {
  if (err) {
    console.log(err);
    process.exit(0);
  } else {
    console.info("events were successfully stored.");
    process.exit(0);
  }
}
