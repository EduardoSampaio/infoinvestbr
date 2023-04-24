import { Theme, createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";

interface TemaAppContextProps {
  theme?: Theme;
  toggleColorMode?: () => void;
}

const ColorModeContext = React.createContext<TemaAppContextProps>({});

export function ColorModeContextProvider(props: any) {
  const initialTheme = createTheme({
    palette: {
      mode: 'light'
    },
  });
  
  const [theme, setTheme] = useState<Theme>(initialTheme)
  

  function toggleColorMode() {
    if(theme.palette.mode === 'dark') {
      const newTheme = createTheme({
        palette: {
          mode: 'light',
        },
      });
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme.palette.mode)
    }else{
      const newTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme.palette.mode)
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme === 'dark') {
      const newTheme = createTheme({
        palette: {
          mode: 'dark'
        },
      });
      setTheme(newTheme)
    }else{
      const newTheme = createTheme({
        palette: {
          mode: 'light'
        },
      });
      setTheme(newTheme)
    }
}, [])

  return (
    <ColorModeContext.Provider value={{ theme, toggleColorMode }}>
      <ThemeProvider theme={theme}>
       {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ColorModeContext;
