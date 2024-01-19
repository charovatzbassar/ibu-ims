import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  InternshipsPage,
  SignInPage,
  CreateListingPage,
} from "@/pages";
import { Navigation } from "@/components";
import { ProtectedRoute } from "@/utils";

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/auth/login" element={<SignInPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Navigation />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="internships" element={<InternshipsPage />} />
          <Route path="create-listing" element={<CreateListingPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
