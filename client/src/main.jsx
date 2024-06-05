import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import { action as LoginAction } from "./pages/authentication/Login";
import { action as RegisterAction } from "./pages/authentication/Register";
import Home from "./pages/home/Home";
import { loader as appLoader } from "./utils/ProtectedRoutes";
import ErrorPage from "./ErrorPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import "./css/custom.css";

const router = createBrowserRouter([
  {
    // path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: LoginAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <Register />,
        action: RegisterAction,
        errorElement: <ErrorPage />,
      },
      {
        element: <ProtectedRoutes />,
        loader: appLoader,
        children: [
          {
            path: "/",
            element: <Home />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
