// src/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Django backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
export const addAccessTokenInterceptor = (getAccessTokenSilently) => {
  axiosInstance.interceptors.request.use(async (config) => {
    try {
      const token = await getAccessTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (ex) {
      console.warn(`Error occured ${ex}`);
    }
    return config;
  });
};
