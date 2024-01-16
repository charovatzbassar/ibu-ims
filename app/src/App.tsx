import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardPage, InternshipsPage, SignInPage } from "@/pages";
import { Navigation } from "@/components";
import ProtectedRoute from "@/utils/ProtectedRoute";

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
