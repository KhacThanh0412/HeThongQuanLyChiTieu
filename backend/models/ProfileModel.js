const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  age: Number,
  address: String,
  income: Number,
  expenses: Number,
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  leadGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

module.exports = mongoose.model("Profile", profileSchema);
