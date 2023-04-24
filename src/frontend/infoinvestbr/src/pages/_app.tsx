import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import React from "react";
import { ColorModeContextProvider } from "@/data/themeContext";


export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  return (
    <ColorModeContextProvider theme={colorMode}>
      <CssBaseline />
      <Component {...pageProps} />
    </ColorModeContextProvider>
  );
}
