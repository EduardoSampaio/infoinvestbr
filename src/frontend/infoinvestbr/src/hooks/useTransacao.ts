import { ITransacao } from "@/models/transacao.model";
import { useEffect, useState } from "react";

export default function useTransacao() {
    const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
    const [openEditar, setOpenEditar] = useState<boolean>(false);

    async function onOpenEditar(value: ITransacao) {
        console.log(value)
        setOpenEditar(!openEditar)
    }

    async function onDeletar(value: number) {
        console.log(value + "onDeletar ")
        const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
        fetch(`${API_HOST}/transacoes/${value}`, { method: 'DELETE' })
            .then((value) => onListar())
            .catch((error) => console.log(error))
    }

    async function onSalvar(transacao: ITransacao) {
        console.log("salvar")
    }

    async function onListar() {
        const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
        fetch(`${API_HOST}/transacoes/146dde84-bc5a-4e9a-bcd7-44f221b63cda`)
            .then((data) => data.json())
            .then((json) => setTransacoes(json.result));
    }


    useEffect(() => {
        onListar();
        console.log("useEffect");
    }, []);

    return {
        transacoes,
        onDeletar,
        onSalvar,
        onOpenEditar,
        openEditar
    }
}
