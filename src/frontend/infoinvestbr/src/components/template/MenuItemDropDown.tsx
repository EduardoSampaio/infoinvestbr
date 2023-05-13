import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IconType } from "react-icons/lib";

interface MenuItemProps {
  icon: IconType;
  titulo: string;
  children?: any;
  url?: string;
  activeUrlOpt?: string[];
}

export default function MenuItemDropDown(props: MenuItemProps) {
  const router = useRouter();
  const active =
    router.pathname === props.url || props.activeUrlOpt?.includes(router.pathname)
      ? `
  bg-gray-100 text-black border-b-2 border-black 
  dark:bg-gray-500 dark:text-white dark:border-white dark:hover:border-white
  `: "";

  return (
    <div
      className={`
                group
                flex flex-col items-center text-sm
                mx-2 pt-1.5 px-6 cursor-pointer
                 hover:bg-gray-100 hover:border-b-2
                 dark:hover:bg-gray-500 dark:text-white dark:hover:text-white ${active}`}
    >
      {<props.icon className="text-2xl" />}
      <span className="text-xs">{props.titulo}</span>
      <div
        className={`hidden group-hover:block absolute z-40 min-h-[200px] w-[20%] 
      bg-white dark:bg-gray-600 shadow-2xl rounded-xl top-[6%]`}
      >
        {/* <div className="w-full flex justify-center">
          <div className="absolute -top-2 h-[20px] w-[20px] bg-white dark:bg-gray-600 rotate-45"></div>
        </div> */}
        <div className="flex flex-col w-full flex-wrap">{props.children}</div>
      </div>
    </div>
  );
}
