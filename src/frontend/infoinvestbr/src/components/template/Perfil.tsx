import useAuth from "@/data/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineLogout } from "react-icons/hi";

export function Perfil() {
  const { usuario, logout } = useAuth();
  return (
    <div className="flex items-center">
      <span className="dark:text-white text-sm font-semibold mr-5">
        Olá {usuario?.nome}
      </span>
      <Image
        alt="perfil"
        src={usuario?.imagem !== undefined ? usuario?.imagem : ""}
        className="rounded-full mr-5"
        width="35"
        height="35"
      />
      <button className="flex text-2xl mr-5" onClick={logout}>
        <HiOutlineLogout className="dark:text-white" />
      </button>
    </div>
  );
}
