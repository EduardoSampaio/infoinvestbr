import NavMenu from "./NavMenu";
import Logo from "./Logo";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import useAppTheme from "@/hooks/useAppTheme";



export default function Header() {
  const {theme, toggleColorMode} = useAppTheme();

  return (
    <div
      className={`flex w-full h-12 max-w-[100%] bg-white dark:bg-primary-gray justify-center`}
    >
      <Logo />
      <NavMenu />
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode}>
        {theme?.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}
