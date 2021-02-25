const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

const eventSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    creatorID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    city: { type: String },
    adress: { type: String },
    location: pointSchema,
    car: { type: Boolean },
    nop: { type: Number }, //nop:number of participants
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ispublic: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
