import { ComponentType, FC } from "react";

import { SignIn } from "../pages/SignIn";
import { useAuth } from "../hooks";

interface PrivateRouteProps {
  Page: ComponentType;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ Page }) => {
  const { signed } = useAuth();

  return signed ? <Page /> : <SignIn />;
};
