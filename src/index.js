const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");

const app = express();

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://coolboyalan:RtSX23qZ9j75BEad@cluster0.yzrqd.mongodb.net/students-records");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.use("/",route);

app.listen(3000, () => {
  console.log("Server started on port 3000");
  connectDB();
});
