import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-qnf9.onrender.com"
});

export const fetchEmployees = () => API.get("/employees");
export const createEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
export const markAttendance = (data) => API.post("/attendance", data);
export const fetchAttendanceByEmployee = (employeeId) =>
  API.get(`/attendance/${employeeId}`);
export const fetchEmployeeCount = () => API.get("/employees/count");

export default API;
