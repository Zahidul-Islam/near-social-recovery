import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import ThemeContextProvider, { theme } from "./src/context/ThemeContext";
import AuthContextProvider from "./src/context/AuthContext";
import RouteController from "./src/RouteController";

export default function App({ isSignedIn, socialRecovery, wallet }) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ThemeContextProvider>
          <AuthContextProvider>
            <RouteController />
          </AuthContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
