const studentModel = require("../models/studentModel");

const addStudent = async (req, res) => {
  try {
    const { name, subject, marks } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid name" });
    }

    const regex = /^[a-zA-Z ]*$/;

    if (name.length < 3) {
      return res
        .status(400)
        .send({ status: false, message: "name is too short" });
    }

    if (!regex.test(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name can only have alphabets" });
    }

    if (!subject || typeof subject !== "string") {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid subject" });
    }

    if (!regex.test(subject)) {
      return res
        .status(400)
        .send({ status: false, message: "subject can only have alphabets" });
    }

    if (!marks || typeof marks !== "number") {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid marks" });
    }

    const existing = await studentModel.findOne({ name, subject });

    if (!existing) {
      const data = await studentModel.create({ name, subject, marks });
      return res
        .status(201)
        .send({ status: false, message: "New Record Added", data });
    }

    const data = await studentModel.findOneAndUpdate(
      { name, subject },
      { $inc: { marks } },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Marks has been updated", data });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: false, message: "Internal server error", error: err });
  }
};

module.exports = {
  addStudent,
};
