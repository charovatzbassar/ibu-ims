import axios from "axios";

export const login = () => {
  window.location.href = "http://localhost:8080/auth/google";
};

export const logout = async () => {
  const res = await axios.get("http://localhost:8080/auth/google/logout", {
    withCredentials: true,
  });
  console.log(res);
};
