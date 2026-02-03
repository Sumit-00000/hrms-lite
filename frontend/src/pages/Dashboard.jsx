import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        const res = await fetchEmployees();
        setEmployees(res.data?.data || []);
      } catch (err) {
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  return (
    <div className="container">
      {/* Summary Card */}
      <div className="card">
        <h2>Dashboard</h2>

        <p style={{ marginTop: 10, fontSize: 18 }}>
          Total Employees: <strong>{employees.length}</strong>
        </p>
      </div>

      {/* Employee Table */}
      <div className="card" style={{ marginTop: 30 }}>
        <h2>Employee List</h2>

        {loading && <p>Loading employees...</p>}

        {!loading && error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {!loading && employees.length === 0 && (
          <p>No employees found.</p>
        )}

        {!loading && employees.length > 0 && (
          <table width="100%" style={{ marginTop: 15 }}>
            <thead>
              <tr>
                <th align="left">Employee ID</th>
                <th align="left">Full Name</th>
                <th align="left">Department</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
