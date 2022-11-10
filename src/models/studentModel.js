const { Schema, model } = require("mongoose");

const Student = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    marks: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("student", Student);
