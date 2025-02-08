//This will create an axios instance so no need to create and call the axios functions everywhere just call the function and pass data to this Connector object.

import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
// Create axios instance with a base URL
export const axiosInstance = axios.create({
  baseURL: apiUrl || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Connector Function
export const apiConnector = (method, url, bodyData, headers, params) => {
  const accountData = JSON.parse(localStorage.getItem("account"));
  let token;

  if (accountData) {
    token = accountData.token;
  }

  headers = headers || {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers,
    params: params || null,
  });
};
