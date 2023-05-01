import { ITransacao } from "@/models/transacao.model";
import { useEffect, useState } from "react";

interface SnackConfig {
    open: boolean
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
}

export default function useTransacao() {
    const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState<SnackConfig>({ open: false, message: "", type: 'success' });
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;


    const [confirmOpen, setConfirmOpen] = useState<{open: boolean, value?: number}>({open: false})

    const deleteHandle = () => {
        console.log("deletePost")
        fetch(`${API_HOST}/transacoes/${confirmOpen.value}`, { method: 'DELETE' })
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

    async function onEditar(value: ITransacao) {
        fetch(`${API_HOST}/transacoes`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            .then(() => {
                onListar()
                snackConfig(
                    true,
                    "Transação Salva com sucesso!",
                    "success"
                )
            })
            .catch((error) => snackConfig(
                true,
                "Erro ao salvar Transação!",
                "error"
            ))
    }

    async function onDeletar(value: number) {
        setConfirmOpen({open: true, value})
    }

    async function onSalvar(transacao: ITransacao) {
        console.log("salvar")
    }

    async function onListar() {
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
        onEditar,
        openSnack,
        handleClose,
        confirmOpen,
        setConfirmOpen,
        deleteHandle
    }
}
