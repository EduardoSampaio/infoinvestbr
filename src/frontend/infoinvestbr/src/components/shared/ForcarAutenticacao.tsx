import useAuth from "@/data/hooks/useAuth"
import Image from "next/image"
import Forbbiden from "./Forbbiden"

export default function ForcarAutenticacao(props: any) {
    const {carregando, usuario} = useAuth()
    function renderizarConteudo() {
        return (
        <>
         {props.children}
        </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`flex justify-center items-center h-screen`}>
                <Image src={'/loading.svg'} alt="loading" width={"200"} height={"200"} />
            </div>
        )
    }
    
    if(!carregando && usuario?.is_authenticated) {
        return renderizarConteudo()
    }else{
        // if (typeof window !== "undefined") {
        //     document.location.href = "/login"
        // }
        return (<Forbbiden />);
    }
}