import { useEffect, useState } from "react";
import {
  fetchEmployees,
  markAttendance,
  fetchAttendanceByEmployee
} from "../services/api";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Load employees (FOR DROPDOWN)
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchEmployees();
        console.log("Employee API Response:", res.data);

        const list = res.data?.data || [];
        setEmployees([...list]); // force re-render
      } catch (err) {
        console.error(err);
        setError("Failed to load employees");
      }
    };

    loadEmployees();
  }, []);

  // 🔹 Load attendance when employee changes
  useEffect(() => {
    if (!selectedEmployee) {
      setAttendance([]);
      return;
    }

    const loadAttendance = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchAttendanceByEmployee(selectedEmployee);
        setAttendance(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, [selectedEmployee]);

  // 🔹 Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedEmployee || !date) {
      setError("Please select employee and date");
      return;
    }

    try {
      await markAttendance({
        employeeId: selectedEmployee,
        date,
        status
      });

      // Reload attendance after marking
      const res = await fetchAttendanceByEmployee(selectedEmployee);
      setAttendance(res.data?.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to mark attendance"
      );
    }
  };

  return (
    <div className="container">
      {/* Mark Attendance */}
      <div className="card">
        <h2>Mark Attendance</h2>

        {error && (
          <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            required
          >
            <option value="">Select Employee</option>

            {employees.length > 0 &&
              employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName} ({emp.employeeId})
                </option>
              ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button type="submit" disabled={!selectedEmployee || !date}>
            Mark Attendance
          </button>
        </form>
      </div>

      {/* Attendance Records */}
      <div className="card" style={{ marginTop: 30 }}>
        <h2>Attendance Records</h2>

        {loading && <p>Loading attendance...</p>}

        {!loading && selectedEmployee && attendance.length === 0 && (
          <p>No attendance records found.</p>
        )}

        {!loading && attendance.length > 0 && (
          <table width="100%" style={{ marginTop: 15 }}>
            <thead>
              <tr>
                <th align="left">Date</th>
                <th align="left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((att) => (
                <tr key={att._id}>
                  <td>{att.date}</td>
                  <td>{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Attendance;
