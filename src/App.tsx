import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import { UserManagementProvider } from "./contexts";
import { router } from "./routes";

function App() {
  return (
    <UserManagementProvider>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </UserManagementProvider>
  );
}

export default App;
