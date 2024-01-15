import { Route, Routes } from "react-router-dom";
import React from "react";
import SignInPage from "./screens/SignInPage/SignInPage";
import Navigation from "./components/Navigation/Navigation";
import DashboardPage from "./screens/DashboardPage/DashboardPage";
import InternshipsPage from "./screens/InternshipsPage/InternshipsPage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/auth/login" element={<SignInPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Navigation />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="internships" element={<InternshipsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
