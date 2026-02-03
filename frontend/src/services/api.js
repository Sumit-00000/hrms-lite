import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const fetchEmployees = () => API.get("/employees");
export const createEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
export const markAttendance = (data) => API.post("/attendance", data);
export const fetchAttendanceByEmployee = (employeeId) =>
  API.get(`/attendance/${employeeId}`);
export const fetchEmployeeCount = () => API.get("/employees/count");

export default API;
