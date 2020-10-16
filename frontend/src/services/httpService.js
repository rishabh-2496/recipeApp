import axios from "axios";
import { toast } from "react-toastify";
import { getItem, logout } from "../utils/genericUtils";
import jwtDecode from "jwt-decode";

const authToken = getItem("token");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${authToken}` },
});

axiosInstance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  // if unauthorized logout and redirect to home
  if (error.response.status === 401) {
    logout();
    window.location = "/";
  }

  return Promise.reject(error.response);
});

export const getCurrentUser = () => {
  try {
    const jwt = getItem("token");
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
};

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
