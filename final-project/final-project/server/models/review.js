var mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  id: { type: String, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book"},
  msgText: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Review", reviewSchema);