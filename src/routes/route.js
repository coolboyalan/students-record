const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const studentController = require("../controllers/studentController");

router.post("/admin", adminController.signUp);
router.post("/admin/login", adminController.login);

router.post("/addStudent", studentController.addStudent);
router.get("/getStudents", studentController.getStudents);
router.put("/updateStudent/:id", studentController.updateStudent);
router.delete("/deleteStudent/:id", studentController.deleteStudent);

module.exports = router;
