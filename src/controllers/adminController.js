const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    res.setHeader("test", 242);
    if (!username || typeof username !== "string") {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid username" });
    }
    if (username.length < 8) {
      return res.status(400).send({
        status: false,
        message: "username should be atleast 8 characters long",
      });
    }
    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid password" });
    }
    if (password.length < 8) {
      return res.status(400).send({
        status: false,
        message: "password should be atleast 8 characters long",
      });
    }

    const existing = await AdminModel.findOne({ username });
    if (existing) {
      return res.status(400).send({
        status: false,
        message: "a user with username already exists",
      });
    }

    const output = await AdminModel.create({ username, password });
    return res.status(201).send({ status: true, data: output });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Internal server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid username" });
    }
    if (username.length < 8) {
      return res.status(400).send({
        status: false,
        message: "username should be atleast 8 characters long",
      });
    }
    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid password" });
    }
    if (password.length < 8) {
      return res.status(400).send({
        status: false,
        message: "password should be atleast 8 characters long",
      });
    }

    const user = await AdminModel.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid username" });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .send({ status: false, message: "Incorrect password" });
    }

    const token = jwt.sign({id:user._id}, "mysecretkey");
    res.setHeader("x-api-key", token);
    return res
      .status(200)
      .send({ status: true, message: "Successfully logged in", token });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Internal server error", error: err.message });
  }
};

module.exports = {
  signUp,
  login
};
