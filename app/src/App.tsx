import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import React from "react";
import Redirect from "./components/Redirect";

const router = createBrowserRouter([
  {
    path: "/redirect",
    element: <Redirect />,
  },
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
