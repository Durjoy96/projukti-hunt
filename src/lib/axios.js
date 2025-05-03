import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "/api", // Adjust if needed
  withCredentials: false,
});

// Request Interceptor: Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Auto logout if 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expired or invalid. Logging out...");

      // Clear the token
      localStorage.removeItem("authToken");

      //signout from firebase
      signOut(auth)
        .then(() => {
          console.log("User signed out successfully.");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });

      // Redirect to homepage
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
