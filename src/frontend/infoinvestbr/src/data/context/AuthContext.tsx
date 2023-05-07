import { Usuario } from "@/models/usuario.model";
import { NextRouter, useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface AuthContextProps {
  usuario?: Usuario;
  carregando?: boolean;
  mudarStatusCarregando?: (valor: boolean) => void;
  cadastrar?: (email: string, senha: string) => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  loginGoogle?: (response: any) => void;
  logout?: () => Promise<void>;
  route?: NextRouter;
  headers?: any;
}

const AuthContext = createContext<AuthContextProps>({});

export function AuthProvider(props: any) {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>({});
  const [headers, setHeaders] = useState<any>({});
  const route = useRouter();
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

  function gerenciarCookie(usuario: Usuario) {
    if (usuario.is_authenticated) {
      Cookies.set("infoinvest-auth", JSON.stringify(usuario), {
        expires: 7,
      });
    } else {
      Cookies.remove("infoinvest-auth");
    }
  }

  async function loginGoogle(response: any) {
    try {
      setCarregando(true);
      const token: any = jwt_decode(response.credential);
      const usuario: Usuario = {
        nome: token.name,
        email: token.email,
        imagem: token.picture,
      };

      const retorno = await fetch(`${API_HOST}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      const data = await retorno.json();
      if (data !== undefined && data?.access_token) {
        usuario.id = data.id;
        usuario.access_token = data.access_token;
        usuario.token_type = data.token_type;
        usuario.is_authenticated = true;
        setUsuario(usuario);
        gerenciarCookie(usuario);
        configHeader(usuario);
      }
      console.log(usuario);
      route.push("/");
    } finally {
      setCarregando(false);
    }
  }

  async function configHeader(usuario: Usuario) {
    const headers = {
      Authorization: `Bearer ${usuario.access_token}`,
      Accept: "application/json",
    };
    setHeaders(headers);
  }

  async function logout() {
    try {
      setCarregando(true);
      usuario.is_authenticated = false;
      gerenciarCookie(usuario);
      setUsuario({});
      route.push("/login");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    const cookie = Cookies.get("infoinvest-auth");
    if (cookie !== undefined) {
      const usuarioLogado: Usuario = JSON.parse(cookie);
      setUsuario(usuarioLogado);
      configHeader(usuarioLogado);
    } else {
      route.push("/login");
    }
  }, []);

  function mudarStatusCarregando(valor: boolean) {
    setCarregando(valor);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        loginGoogle,
        mudarStatusCarregando,
        logout,
        headers,
        route
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
