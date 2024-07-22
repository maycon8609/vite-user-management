import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <PrivateRoute Page={() => <Home />} />,
  },
  {
    path: "*",
    element: <h1>404 page not found</h1>,
  },
]);
