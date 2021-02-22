const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    location: [{ type: String }],
    car: { type: Boolean },
    nop: { type: Number }, //nop:number of participants
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ispublic: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
