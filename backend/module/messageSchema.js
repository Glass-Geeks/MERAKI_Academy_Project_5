const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    messages: [{ type: Object }],
    connection_id: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("message", messageSchema);
