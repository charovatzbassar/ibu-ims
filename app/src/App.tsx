import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
