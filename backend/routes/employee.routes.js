const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  deleteEmployee, getEmployeeCount
} = require("../controllers/employee.controller");

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/count", getEmployeeCount);
router.delete("/:id", deleteEmployee);

module.exports = router;
