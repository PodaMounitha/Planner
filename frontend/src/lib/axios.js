import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL;
const normalizedConfiguredApiUrl = configuredApiUrl
  ? configuredApiUrl.replace(/\/$/, "")
  : "";

const BASE_URL = normalizedConfiguredApiUrl
  ? `${normalizedConfiguredApiUrl}/api`
  : import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api";
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
