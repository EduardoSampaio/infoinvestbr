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
    const [confirmOpen, setConfirmOpen] = useState<{ open: boolean, value?: number }>({ open: false })
    const [openNewDialog, setOpenNewDialog] = useState<{ open: boolean, value?: number }>({ open: false })

    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const USER=process.env.NEXT_PUBLIC_USER_ID

    const deleteHandle = () => {
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

    async function onEditar(transacao: ITransacao) {
        try{
            const response = await fetch(`${API_HOST}/transacoes`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(transacao)
                    });
            const data = await response.json()     
            if(!response.ok){
                throw Error(data.message)
            }
  
            snackConfig(
                true,
                data.message,
                "success"
            )
            onListar()

        }catch(error) {
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
        try{
            const response = await fetch(`${API_HOST}/transacoes`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(transacao)
                    });
            const data = await response.json()

            if(!response.ok){
                throw Error(data.message)
            }
  
            snackConfig(
                true,
                data.message,
                "success"
            )
            onListar()

        }catch(error) {
            snackConfig(
                true,
                `${error}`,
                "error"
            )
        }
    }

    async function onListar() {
        fetch(`${API_HOST}/transacoes/${USER}`)
            .then((data) => data.json())
            .then((json) => setTransacoes(json.result));
    }

    useEffect(() => {
        onListar();
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
        deleteHandle,
        openNewDialog,
        setOpenNewDialog
    }
}
