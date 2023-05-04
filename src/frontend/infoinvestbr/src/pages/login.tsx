import Cadastro from "@/components/usuarios/Cadastro";
import Login from "@/components/usuarios/Login";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"Login" | "Cadastro">("Login");

  function changeMode() {
    if (mode === "Login") {
      setMode("Cadastro");
    } else {
      setMode("Login");
    }
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center bg-[url('/img/bglogin.jpeg')]">
      <div className="flex flex-col h-5/6 xl:w-4/12 lg:w-4/12 md:w-4/12 sm:w-4/12 m-auto  drop-shadow-xl bg-white p-20">
        <div className="flex flex-row justify-center">
          {mode === "Login" ? (
            <Image
              priority
              src="/img/logo-light.png"
              height="100"
              width="100"
              alt="Logo"
            />
          ) : (
            false
          )}
        </div>
        {mode === "Login" ? (
          <Login changeMode={changeMode} />
        ) : (
          <Cadastro changeMode={changeMode} />
        )}
      </div>
    </div>
  );
}
