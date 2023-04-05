var mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  id: { type: String, required: true },
  maxBookId: { type: String },
  maxReviewId: { type: String },
  maxUserId: { type: String },
});

module.exports = mongoose.model("Sequence", sequenceSchema);