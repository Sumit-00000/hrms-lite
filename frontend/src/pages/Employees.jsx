import { useEffect, useState } from "react";
import {
  fetchEmployees,
  createEmployee,
  deleteEmployee
} from "../services/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load employees
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetchEmployees();
      setEmployees(res.data.data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createEmployee(form);
      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: ""
      });
      loadEmployees();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add employee"
      );
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch {
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="container">
      {/* Add Employee */}
      <div className="card">
        <h2>Add Employee</h2>

        {error && (
          <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <input
            name="employeeId"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={handleChange}
            required
          />
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Employee</button>
        </form>
      </div>

      {/* Employee List */}
      <div className="card" style={{ marginTop: 30 }}>
        <h2>Employee List</h2>

        {loading && <p>Loading employees...</p>}

        {!loading && employees.length === 0 && (
          <p>No employees found.</p>
        )}

        {!loading && employees.length > 0 && (
          <table width="100%" style={{ marginTop: 15 }}>
            <thead>
              <tr>
                <th align="left">Emp ID</th>
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th align="left">Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Employees;
