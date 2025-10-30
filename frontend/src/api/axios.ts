import axios from "axios";

const BACKEND_URL = import.meta.env.BACKEND_URL;

const API = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default API;
