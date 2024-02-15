import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  InternshipListingsPage,
  LoginPage,
  CreateListingPage,
  InternshipListingPage,
  EditListingPage,
  MyListingsPage,
  ProfileInfoPage,
  MyInternshipsPage,
  InternshipDetailsPage,
  InternshipReportPage,
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
          <Route path="profile-info" element={<ProfileInfoPage />} />
          <Route element={<RoleRoute roles={["company", "manager"]} />}>
            <Route path="my-internships" element={<MyInternshipsPage />} />
            <Route
              path="my-internships/:internshipID"
              element={<InternshipDetailsPage />}
            />
          </Route>
          <Route element={<RoleRoute roles={["company"]} />}>
            <Route path="create-listing" element={<CreateListingPage />} />
            <Route
              path="internship-listings/:listingID/edit"
              element={<EditListingPage />}
            />
            <Route
              path="my-internships/:internshipID/report"
              element={<InternshipReportPage />}
            />
            <Route path="my-listings" element={<MyListingsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/home/dashboard" />} />
    </Routes>
  );
}

export default App;
