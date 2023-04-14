import Cadastro from "@/components/usuarios/Cadastro";
import Image from "next/image";

export default function CadastroPage() {

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center bg-[url('/img/bglogin.jpeg')]">
      <div className="flex flex-col xl:w-4/12 lg:w-4/12 md:w-4/12 sm:w-4/12 m-auto  drop-shadow-xl bg-white p-20">
        <div className="flex flex-row justify-center">
          <Image
            priority
            src="/img/logo.png"
            height="200"
            width="200"
            alt="Logo"
          />
        </div>
        <Cadastro />
      </div>
    </div>
  );
}