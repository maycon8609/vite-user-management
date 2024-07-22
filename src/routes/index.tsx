import { ComponentType, FC } from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

import { useAuth } from "../hooks/useAuth";

interface PrivateProps {
  Page: ComponentType;
}

// TODO: tentar melhorar isso aqui.
const Private: FC<PrivateProps> = ({ Page }) => {
  const { signed } = useAuth();

  return signed ? <Page /> : <SignIn />;
};

export const router = createBrowserRouter([
  // {
  //   path: "*",
  //   element: <h1>404 page not found</h1>,
  // },
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
    element: <Private Page={() => <Home />} />,
  }
]);
