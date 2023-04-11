const mongoose = require("mongoose");

mongoose.connect(`${process.env.DB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var db = mongoose.connection;

db.on("connected", () => {
  console.log("mongodb is connect");
});

db.on("error", () => {
  console.log("not connected");
});
