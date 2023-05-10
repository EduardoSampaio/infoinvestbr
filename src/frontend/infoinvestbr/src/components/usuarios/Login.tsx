import { GoogleLogin } from "@react-oauth/google";
import useAuth from "@/data/hooks/useAuth";
import { useState } from "react";
import useFetchApi from "@/data/hooks/useFetchApi";
import useNotification from "@/data/hooks/useNotification";
import { error } from "console";
interface LoginProps {
  changeMode?: () => void;
}

export default function Login(props: LoginProps) {
  const { loginGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const { setVisible } = useNotification();
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

  const submit = async ()  => {
    const formData = new FormData();
    formData.append("username", email)
    formData.append("password", senha)
    login?.(formData).catch(() =>  
    setVisible?.("Usuário ou Senha incorretos",'error'))
  }
  return (
    <>
      <div className="flex flex-col h-full justify-center">
        <div className="flex w-full justify-center">
          <GoogleLogin
            onSuccess={(response) => loginGoogle?.(response)}
            locale="pt-BR"
            size="large"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
            placeholder="Digite seu Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Senha
          </label>
          <input
            type="password"
            id="senha"
            className="bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5"
            required
            placeholder="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </div>
        <div className="flex">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={submit}
          >
            ENTRAR
          </button>
        </div>
        <div className="flex mt-5">
          <button
            onClick={props.changeMode}
            className="text-blue-500 active:text-blue-800"
          >
            Não tem conta ? Criar uma nova conta
          </button>
        </div>
      </div>
    </>
  );
}
