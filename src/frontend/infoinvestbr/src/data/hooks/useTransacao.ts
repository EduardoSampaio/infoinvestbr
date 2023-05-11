import { ITransacao } from "@/models/transacao.model";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useFetchApi from "./useFetchApi";
import useNotification from "./useNotification";

interface SnackConfig {
    open: boolean
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    isLoading?: boolean
}

export default function useTransacao() {
    const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
    const [openSnack, setOpenSnack] = useState<SnackConfig>({ open: false, message: "", type: 'success' });
    const [confirmOpen, setConfirmOpen] = useState<{ open: boolean, value?: number }>({ open: false })
    const [openNewDialog, setOpenNewDialog] = useState<{ open: boolean, value?: number }>({ open: false })
    const { usuario, headers } = useAuth()

    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const USER = usuario?.id
    const {save, remove, update, find} = useFetchApi();
    const {setVisible} = useNotification();
    const [isLoading, setLoading] = useState(true);
  

    const deleteHandle = () => {
        remove(`${API_HOST}/transacoes/${confirmOpen.value}`)
            .then(() => {
                onListar()
                setVisible?.("Transação excluída com sucesso!",'success')
            })
            .catch(() => {
                setVisible?.("Erro ao excluir uma Transação!",'error')
            })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack({ open: false, message: "", type: 'success' });
    };

    async function onEditar(transacao: ITransacao) {
        update(`${API_HOST}/transacoes`, transacao).then(result => {
            setVisible?.(`${result.message}`,'success')
            onListar()

        }).catch(result => { 
            setVisible?.( `${result.error}`,'success')
        })
    }

    async function onDeletar(value: number) {
        setConfirmOpen({ open: true, value })
    }

    async function onSalvar(transacao: ITransacao) {
        save(`${API_HOST}/transacoes`, transacao).then(result => {
            setVisible?.(`${result.message}`,'success')
            onListar()

        }).catch(result => { 
            setVisible?.( `${result.error}`,'error')
        })
    }

    async function onListar() {
        setLoading(true)
        if(usuario?.id) {
            find(`${API_HOST}/transacoes/${USER}`)
                .then((json) => {
                    setTransacoes(json.result)              
                }).catch(result => {
                    setVisible?.( `${result.error}`,'error')
                }).finally(() => setLoading(false));
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
        setOpenNewDialog,
        isLoading
    }
}
