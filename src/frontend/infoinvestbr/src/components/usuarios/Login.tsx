import Image from "next/image";
import Link from "next/link";

export default function Login(props: any) {
  return (
    <>
      <div className="flex flex-col h-full justify-center">
        <button
          type="button"
          className="flex px-8 py-2.5 active:ring-2 border-2 mb-5 justify-center"
        >
          <Image
            priority
            src="/img/google.svg"
            height="24"
            width="24"
            alt="Google Login"
          />
          <p className="pl-5">ENTRAR COM O GOOGLE</p>
        </button>
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
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ENTRAR
          </button>
        </div>
        <div className="flex mt-5">
          <Link href={"/auth/cadastro"}>
            <button
              className="text-blue-500 active:text-blue-800"
            >
              Não tem conta ? Criar uma nova conta
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
