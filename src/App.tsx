import "./global/styles";

import { FC } from "react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import { UserManagementProvider } from "./contexts";
import { router } from "./routes";

export const App: FC = () => {
  return (
    <UserManagementProvider>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </UserManagementProvider>
  );
};
