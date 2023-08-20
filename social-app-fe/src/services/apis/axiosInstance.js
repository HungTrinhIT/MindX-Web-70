import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_API;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken") || "";

  if (accessToken) {
    config.headers["x-access-token"] = accessToken;
  }

  return config;
});

export default axiosInstance;
