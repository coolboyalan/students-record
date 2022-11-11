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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("student", Student);
