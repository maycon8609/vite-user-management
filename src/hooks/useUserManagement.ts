import { useContext } from "react";
import {
  UserManagementContext,
  UserManagementContextProps
} from "../contexts/userManagement";

export const useUserManagement: () => UserManagementContextProps = () => {
  const context = useContext(UserManagementContext);

  return context;
};