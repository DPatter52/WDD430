var mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  description: {type: String},
  imageUrl: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);
