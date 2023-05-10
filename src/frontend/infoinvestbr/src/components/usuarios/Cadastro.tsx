import useFetchApi from "@/data/hooks/useFetchApi";
import useNotification from "@/data/hooks/useNotification";
import { Usuario } from "@/models/usuario.model";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface CadastroProps {
  changeMode?: () => void;
}

export default function Cadastro(props: CadastroProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarsenha,setConfirmarsenha] = useState("");
  const { save_anomimo } = useFetchApi();
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const { setVisible } = useNotification();

  const submit = () => {
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
      confirmar_senha: confirmarsenha,
    };
    save_anomimo(`${API_HOST}/usuarios/`, usuario)
      .then((result) => {
        setVisible?.(`${result.message}`, "success");
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarsenha("");
        props.changeMode?.();
      })
      .catch((result) => {
        setVisible?.(`${result.error}`, "error");
      });
  };

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-6">
        <label
          htmlFor="nome"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome
        </label>
        <input
          type="nome"
          id="nome"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Digite seu Nome"
          required
          onChange={(e) => setNome(e.target.value)}
          value={nome}
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div className="mb-6">
        <label
          htmlFor="confirmarsenha"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirmar Senha
        </label>
        <input
          type="password"
          id="confirmar-senha"
          className="bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full p-2.5"
          required
          placeholder="Confirme sua senha"
          onChange={(e) => setConfirmarsenha(e.target.value)}
          value={confirmarsenha}
        />
      </div>
      <div className="flex">
        <button
          onClick={() => submit()}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cadastrar
        </button>
      </div>
      <div className="flex mt-5">
        <button
          className="text-blue-500 active:text-blue-800"
          onClick={props.changeMode}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
