import { Route, Routes } from "react-router-dom";
import React from "react";
import SignInPage from "./pages/SignInPage";
import Navigation from "./components/Navigation";
import DashboardPage from "./pages/DashboardPage";
import InternshipsPage from "./pages/InternshipsPage";
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
