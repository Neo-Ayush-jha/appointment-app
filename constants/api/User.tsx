import axios from "axios";

const API_BASE_URL = "http://172.16.205.30:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiCallAuth = async (endpoint, method = "GET", data = {}) => {
  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      data,
    });
    // console.log("Response from backend:", response);
    return response.data;
  } catch (error) {
    console.error(`Error calling backend API ${endpoint} `, error);
    throw error;
  }
};
export const signupUser = (data) => {
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

export const loginUser = (data) => {
  if (!data || !data.email || !data.password) {
    throw new Error("Email and password are required for login");
  }
  return apiCallAuth("/auth/login", "POST", data);
};

export default {
  signupUser,
  loginUser,
};
