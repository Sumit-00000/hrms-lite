const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendanceByEmployee
} = require("../controllers/attendance.controller");

router.post("/", markAttendance);
router.get("/:employeeId", getAttendanceByEmployee);

module.exports = router;
