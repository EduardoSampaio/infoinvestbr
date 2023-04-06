import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="w-full h-screen bg-gray-100 flex justify-center bg-[url('/img/bglogin.jpeg')]">
        <div className="flex flex-col h-5/6 xl:w-4/12 lg:w-4/12 md:w-4/12 sm:w-4/12 m-auto  drop-shadow-xl bg-white p-20">
          <div className="flex flex-row justify-center">
            <Image
              priority
              src="/img/logo.png"
              height="200"
              width="200"
              alt="Logo"
            /> 
          </div>
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
            <div class="mb-6">
              <label
                for="email"
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
                for="password"
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
          </div>
        </div>
      </div>
    </>
  );
}
