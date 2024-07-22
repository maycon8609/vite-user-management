import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../contexts/auth";

export const useAuth: () => AuthContextProps = () => {
  const context = useContext(AuthContext);

  return context;
};