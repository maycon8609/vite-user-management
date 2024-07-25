import { useContext } from "react";

import { UserManagementContext } from '@/contexts'
import type { UserManagementContextProps } from "@/contexts";

export const useUserManagement: () => UserManagementContextProps = () => {
  const context = useContext(UserManagementContext);

  return context;
};