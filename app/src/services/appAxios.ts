import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const appAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default appAxios;
