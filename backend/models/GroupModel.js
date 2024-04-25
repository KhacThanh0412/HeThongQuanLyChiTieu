const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goal" }],
});

module.exports = mongoose.model("Group", groupSchema);
