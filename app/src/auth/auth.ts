import axios from "axios";

export const login = () => {
  window.location.href = "http://localhost:8080/auth/google";
};

export const logout = async () => {
  await axios.get("http://localhost:8080/auth/google/logout", {
    withCredentials: true,
  });
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
};

export const getUser = async () => {
  const res = await axios.get("http://localhost:8080/auth/google/user", {
    withCredentials: true,
  });
  return res.data.user;
};
