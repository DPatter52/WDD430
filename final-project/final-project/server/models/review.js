var mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  id: { type: String, required: true },
  book: { type: String},
  msgText: { type: String, required: true },
  sender: { type: String },
});

module.exports = mongoose.model("Review", reviewSchema);