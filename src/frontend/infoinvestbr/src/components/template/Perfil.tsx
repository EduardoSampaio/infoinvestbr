import Image from "next/image";
import Link from "next/link";
import { HiOutlineLogout } from "react-icons/hi";

export function Perfil() {
  return (
    <div className="flex flex-col items-center border-b-2">
      <Image
        alt="perfil"
        src="/img/eduardo.jpg"
        className="shadow-lg rounded-full h-12 w-12 align-middle border-none cursor-pointer"
        width="40"
        height="40"
      />
      <span className="dark:text-white text-xs font-semibold">Eduardo</span>
      <div className="m-1">
        <Link href="/auth/login">
          <button className="flex justify-evenly items-center">
            <HiOutlineLogout className="dark:text-white" />
            <span className="dark:text-white text-xs">Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
