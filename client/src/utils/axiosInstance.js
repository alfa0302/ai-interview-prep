import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response.status === 500) {
      console.log("Server error. Please try again later");
    } else if (error.code === "ECONNABORTED") {
      console.log("Request timeout. Please try again");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
