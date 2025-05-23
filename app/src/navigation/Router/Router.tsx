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
  MyInternshipPage,
  MyApplicationsPage,
  MyStudentsPage,
  StudentDetailsPage,
  MyInternsPage,
  DayReportsPage,
  InternDetailsPage,
} from "@/pages";
import { ProtectedRoute, RoleRoute, MainNavigation } from "@/navigation";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<MainNavigation />}>
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
            <Route path="my-interns" element={<MyInternsPage />} />
            <Route
              path="my-interns/:internID"
              element={<InternDetailsPage />}
            />
          </Route>
          <Route element={<RoleRoute roles={["intern"]} />}>
            <Route path="my-internship" element={<MyInternshipPage />} />
            <Route path="my-applications" element={<MyApplicationsPage />} />
            <Route path="my-internship/days" element={<DayReportsPage />} />
          </Route>
          <Route element={<RoleRoute roles={["manager"]} />}>
            <Route path="my-students" element={<MyStudentsPage />} />
            <Route
              path="my-students/:internID"
              element={<StudentDetailsPage />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/home/dashboard" />} />
    </Routes>
  );
};

export default Router;
