import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  InternshipListingsPage,
  LoginPage,
  CreateListingPage,
  InternshipListingPage,
  EditListingPage,
} from "@/pages";
import { Navigation } from "@/components";
import { ProtectedRoute, RoleRoute } from "@/utils";

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
            <Route
              path="internship-listings/:listingID/edit"
              element={<EditListingPage />}
            />
            <Route path="my-listings"></Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
