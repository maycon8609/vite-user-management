import { useContext } from "react";

import { AuthContext } from "@/contexts";
import type { AuthContextProps } from "@/contexts";

export const useAuth: () => AuthContextProps = () => {
  const context = useContext(AuthContext);

  return context;
};