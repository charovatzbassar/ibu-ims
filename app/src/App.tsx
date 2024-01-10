import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import SignInPage from "./pages/SignInPage";
import Navigation from "./components/Navigation";
import { getUser } from "./auth/auth";
import DashboardPage from "./pages/DashboardPage";
import InternshipsPage from "./pages/InternshipsPage";
import RedirectComponent from "./utils/RedirectComponent";

const router = createBrowserRouter([
  {
    path: "/redirect",
    element: (await getUser()) ? (
      <RedirectComponent />
    ) : (
      <Navigate to="/auth/login" />
    ),
  },
  {
    path: "/home",
    element: (await getUser()) ? <Navigation /> : <Navigate to="/auth/login" />,
    children: [
      {
        path: "dashboard",
        element: (await getUser()) ? (
          <DashboardPage />
        ) : (
          <Navigate to="/auth/login" />
        ),
      },
      {
        path: "internships",
        element: (await getUser()) ? (
          <InternshipsPage />
        ) : (
          <Navigate to="/auth/login" />
        ),
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <SignInPage />,
      },
    ],
  },
]);

function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
