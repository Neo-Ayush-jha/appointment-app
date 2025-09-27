import axios from "axios";

// const API_BASE_URL = "http://172.16.205.30:3000/api";

const API_BASE_URL = "http://10.234.230.30:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const apiCallAuth = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data: any = {},
  token?: string
) => {
  try {
    console.log("Api Request to backend:--------------", {
      endpoint,
      method,
      data,
      token,
    });
    const response = await axiosInstance({
      url: endpoint,
      method,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    // console.log("Response from backend:", response);
    return response.data;
  } catch (error) {
    console.error(`Error calling backend API ${endpoint} `, error);
    throw error;
  }
};

export const signupUser = (data: any) => {
  if (
    !data ||
    !data.name ||
    !data.email ||
    !data.password ||
    !data.role ||
    !data.organization_id
  ) {
    throw new Error("All signup fields are required");
  }
  return apiCallAuth("/auth/signup", "POST", data);
};

export const loginUser = (data: any) => {
  if (!data || !data.email || !data.password) {
    throw new Error("Email and password are required for login");
  }
  return apiCallAuth("/auth/login", "POST", data);
};

export const callAllUser = () => apiCallAuth("/users", "GET");

//  Organization APIs
export const createOrganization = (data: any, token?: string) =>
  apiCallAuth("/organizations/create", "POST", data, token);

export const getAllOrganizations = (token?: string) =>
  apiCallAuth("/organizations/", "GET", null, token);

export const assignUserToOrganization = (data: any) =>
  apiCallAuth("/organizations/assign/", "PUT", data);

export const approveOrganization = (id: number) =>
  apiCallAuth(`/organizations/approve/${id}`, "POST");

//  Appointment APIs
export const createAppointment = (data: any, token?: string) =>
  apiCallAuth("/appointments", "POST", data, token);

export const getAllAppointments = (token?: string) =>
  apiCallAuth("/appointments", "GET", null, token);

export const getAppointmentById = (id: number) =>
  apiCallAuth(`/appointments/${id}`, "GET");

export const cancelAppointment = (id: number) =>
  apiCallAuth(`/appointments/${id}`, "DELETE");

export const requestReschedule = (id: number, data: any) =>
  apiCallAuth(`/appointments/${id}/reschedule-request`, "POST", data);

export const approveReschedule = (id: number) =>
  apiCallAuth(`/appointments/${id}/reschedule-approve`, "POST");

export const rejectReschedule = (id: number) =>
  apiCallAuth(`/appointments/${id}/reschedule-reject`, "PATCH");

export const getClientAppointments = () =>
  apiCallAuth("/appointments/my/clients", "GET");

export const submitFeedback = (id: number, feedback: any) =>
  apiCallAuth(`/appointments/${id}/feedback`, "POST", feedback);

export const getAppointmentFeedback = (id: number) =>
  apiCallAuth(`/appointments/${id}/viewFeedback`, "GET");

//  Feedback APIs
export const getMyFeedback = () => apiCallAuth("/my-feedback", "GET");

// Chat APIs
export const getChatDetails = (
  appointment_id: string | number,
  token?: string
) => apiCallAuth(`/chat/${appointment_id}`, "GET", null, token);

export const getChatList = (token?: string) =>
  apiCallAuth("/chat/inbox", "GET", null, token);

export const submitChat = (data: any,token?: string) =>
  apiCallAuth("/chat", "POST",data, token);

export default {
  signupUser,
  loginUser,
  createOrganization,
  getAllOrganizations,
  assignUserToOrganization,
  approveOrganization,
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment,
  requestReschedule,
  approveReschedule,
  rejectReschedule,
  getClientAppointments,
  submitFeedback,
  getAppointmentFeedback,
  getMyFeedback,
  callAllUser,
};
