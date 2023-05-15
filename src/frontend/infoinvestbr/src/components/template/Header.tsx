import NavMenu from "./NavMenu";
import Logo from "./Logo";
import React from "react";
import { Perfil } from "./Perfil";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
export default function Header(props: any) {
  return (
    <div className={`flex w-full h-12 bg-white dark:bg-primary-gray`}>
      <div className="w-[200px]">
        <Logo />
      </div>
      <div className="w-full flex justify-end">
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={props.showSearch}>
          <SearchIcon className="text-2xl"/>
        </IconButton>
      </div>
      <div>
      <NavMenu />
      </div>
      <div className="w-full flex items-center justify-end">
        <Perfil />
      </div>
    </div>
  );
}
