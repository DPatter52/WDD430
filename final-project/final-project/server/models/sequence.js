var mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  id: { type: String, required: true },
  maxDocumentId: { type: String },
  maxMessageId: { type: String },
  maxContactId: { type: String },
});

module.exports = mongoose.model("Sequence", sequenceSchema);