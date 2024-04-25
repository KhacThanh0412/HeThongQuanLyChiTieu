const mongoose = require("mongoose");

const goalsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  category: String,
  target_amount: Number,
  current_amount: Number,
});

module.exports = mongoose.model("Goals", goalsSchema);
