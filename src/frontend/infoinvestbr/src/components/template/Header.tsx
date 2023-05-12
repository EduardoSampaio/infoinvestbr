import NavMenu from "./NavMenu";
import Logo from "./Logo";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { Perfil } from "./Perfil";

export default function Header() {
  return (
    <div
      className={`flex w-full h-12 bg-white dark:bg-primary-gray`}
    >
      <Logo />
      <NavMenu />
      <Perfil />
    </div>
  );
}
