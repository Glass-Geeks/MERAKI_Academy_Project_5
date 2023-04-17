const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    messages: [{ type: Object }],
    roomId: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("message", messageSchema);
