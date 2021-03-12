const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    creatorID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ispublic: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
