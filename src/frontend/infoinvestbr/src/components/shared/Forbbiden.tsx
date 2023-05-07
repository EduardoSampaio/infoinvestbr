import { useEffect } from "react";

export default function Forbbiden() {
  useEffect(() => {
    function redirect() {
      if (typeof window !== "undefined") {
        document.location.href = "/login";
      }
    }

    setTimeout(redirect, 5000);
  }, []);

  return (
    <div className="w-full flex justify-center items-center text-9xl">
      <div className="flex flex-col justify-center h-screen">
        <h2>Acesso Negado</h2>
        <h2 className="text-center">Código 403</h2>
        <p className="text-sm text-center mt-10">
          Redirecionando em 5 segundos
        </p>
      </div>
    </div>
  );
}
