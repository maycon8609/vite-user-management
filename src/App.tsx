import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/auth";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
