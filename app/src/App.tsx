import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./components/Dashboard";
import { isLoggedIn } from "./auth/auth";

const router = createBrowserRouter([
  {
    path: "/internships",
    element: (await isLoggedIn()) ? (
      <Dashboard />
    ) : (
      <Navigate to="/auth/login" />
    ),
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
