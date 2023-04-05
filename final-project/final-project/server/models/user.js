var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model("User", userSchema);