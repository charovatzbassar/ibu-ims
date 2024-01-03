import axios from "axios";
import { login, logout } from "./auth/auth";

const getData = async () => {
  const res = await axios.get("http://localhost:8080/api/companies", {
    withCredentials: true,
  });
  console.log(res.data);
};

function App() {
  return (
    <>
      <button onClick={login}>Log In</button>
      <button onClick={logout}>Log Out</button>
      <button onClick={getData}>Get Data</button>
    </>
  );
}

export default App;
