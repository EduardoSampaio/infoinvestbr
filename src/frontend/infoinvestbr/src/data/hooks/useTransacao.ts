import { ITransacao } from "@/models/transacao.model";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

interface SnackConfig {
    open: boolean
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
}

export default function useTransacao() {
    const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState<SnackConfig>({ open: false, message: "", type: 'success' });
    const [confirmOpen, setConfirmOpen] = useState<{ open: boolean, value?: number }>({ open: false })
    const [openNewDialog, setOpenNewDialog] = useState<{ open: boolean, value?: number }>({ open: false })
    const { usuario, headers } = useAuth()

    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const USER = usuario?.id

    const deleteHandle = () => {
        fetch(`${API_HOST}/transacoes/${confirmOpen.value}`, { method: 'DELETE', headers: headers })
            .then(() => {
                onListar()
                snackConfig(
                    true,
                    "Transação excluída com sucesso!",
                    "success"
                )
            })
            .catch(() => snackConfig(
                true,
                "Erro ao excluir uma Transação!",
                "error"
            ))
    }

    function snackConfig(open: boolean, message: string, type: 'success' | 'error' | 'info' | 'warning') {
        setOpenSnack({
            open,
            message,
            type
        })
    }


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack({ open: false, message: "", type: 'success' });
    };

    async function onEditar(transacao: ITransacao) {
        try {
            const response = await fetch(`${API_HOST}/transacoes`,
                {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(transacao)
                });
            const data = await response.json()
            if (!response.ok) {
                throw Error(data.message)
            }

            snackConfig(
                true,
                data.message,
                "success"
            )
            onListar()

        } catch (error) {
            snackConfig(
                true,
                `${error}`,
                "error"
            )
        }
    }

    async function onDeletar(value: number) {
        setConfirmOpen({ open: true, value })
    }

    async function onSalvar(transacao: ITransacao) {
        try {
            const response = await fetch(`${API_HOST}/transacoes`,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(transacao)
                });
            const data = await response.json()

            if (!response.ok) {
                throw Error(data.message)
            }

            snackConfig(
                true,
                data.message,
                "success"
            )
            onListar()

        } catch (error) {
            snackConfig(
                true,
                `${error}`,
                "error"
            )
        }
    }

    async function onListar() {
        if(usuario?.id) {
            fetch(`${API_HOST}/transacoes/${USER}`, {headers: headers})
                .then((data) => data.json())
                .then((json) => {
                    if(json !== undefined && json.result) {
                      setTransacoes(json.result)
                    }else{
                        snackConfig(
                            true,
                            `${json.message}`,
                            "error"
                        )
                    }
                });
        }
    }

    useEffect(() => {
        onListar();
    }, [usuario?.id]);

    return {
        transacoes,
        onDeletar,
        onSalvar,
        onEditar,
        openSnack,
        handleClose,
        confirmOpen,
        setConfirmOpen,
        deleteHandle,
        openNewDialog,
        setOpenNewDialog
    }
}
