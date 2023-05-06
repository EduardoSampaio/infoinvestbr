import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import React from "react";
import { ColorModeContextProvider } from "@/data/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/data/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  return (
    <AuthProvider>
      <ColorModeContextProvider theme={colorMode}>
        <CssBaseline />
        <GoogleOAuthProvider clientId={CLIENT_ID !== undefined ? CLIENT_ID : ""}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </ColorModeContextProvider>
    </AuthProvider>
  );
}
