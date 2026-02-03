const Attendance = require("../models/attendance.model");
const Employee = require("../models/employee.model");

// ➕ Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance status"
      });
    }

    // Check employee exists
    const employeeExists = await Employee.findById(employeeId);
    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    const attendance = await Attendance.create({
      employeeId,
      date,
      status
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance
    });
  } catch (error) {
    // Duplicate attendance handling
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Attendance already marked for this date"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// 📄 Get Attendance By Employee
exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const attendanceRecords = await Attendance.find({ employeeId })
      .populate("employeeId", "fullName employeeId department")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: attendanceRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
