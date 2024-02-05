import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  InternshipListingsPage,
  SignInPage,
  CreateListingPage,
  InternshipListingPage,
} from "@/pages";
import { Navigation } from "@/components";
import { ProtectedRoute, RoleRoute } from "@/utils";

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/auth/login" element={<SignInPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Navigation />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="internship-listings"
            element={<InternshipListingsPage />}
          />
          <Route
            path="internship-listings/:listingID"
            element={<InternshipListingPage />}
          />
          <Route element={<RoleRoute role="company" />}>
            <Route path="create-listing" element={<CreateListingPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
