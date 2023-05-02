import {
  GridColDef,
  GridDeleteIcon,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import Image from "next/image";
import GridCustom from "../shared/GridCustom";
import useTransacao from "@/hooks/useTransacao";
import { Button, IconButton } from "@mui/material";
import DialogEditarTransacao from "./DialogEditarTransacao";
import SnackBarCustom from "../shared/SnackbarCustom";
import ConfirmDialog from "../shared/dialog/ConfirmDialog";
import { HiOutlinePlus } from "react-icons/hi2";
import DialogNovaTransacao from "./DialogNovaTransacao";

function createColumns(onEditar: any, onDeletar: any): GridColDef[] {
  const columns: GridColDef[] = [
    {
      field: "imagem",
      headerName: "#",
      editable: false,
      sortable: false,
      renderCell: (params) => (
        <Image
          alt="imagem ações"
          src={params.value}
          width={"40"}
          height={"40"}
        />
      ),
    },
    {
      field: "codigo_ativo",
      headerName: "Ativo",
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "categoria",
      headerName: "Categoria",
      type: "string",
      editable: false,
      width: 150,
    },
    {
      field: "ordem",
      headerName: "Ordem",
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "corretora",
      headerName: "Corretora",
      type: "string",
      width: 250,
      editable: false,
    },
    {
      field: "data",
      headerName: "Data",
      type: "string",
      width: 120,
      editable: false,
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        if (params.value == null) {
          return "";
        }
        const data = new Date(params.value).toLocaleDateString("pt-BR");
        return `${data} `;
      },
    },
    {
      field: "quantidade",
      headerName: "Quantidade",
      type: "string",
      width: 100,
      editable: false,
    },
    {
      field: "preco",
      headerName: "Preco",
      type: "string",
      width: 80,
      editable: false,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return "";
        }

        return `R$ ${params.value.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })} `;
      },
    },
    {
      field: "total",
      headerName: "Total",
      type: "string",
      width: 120,
      editable: false,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return "";
        }

        return `R$ ${params.value.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })} `;
      },
    },
    {
      field: "id",
      headerName: "Gerenciar",
      editable: false,
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <div className="flex">
          <DialogEditarTransacao transacao={params.row} onEditar={onEditar} />
          <IconButton
            aria-label="deletar"
            onClick={() => onDeletar(params.value)}
          >
            <GridDeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return columns;
}

export default function ListarTransacoes(props: any) {
  const {
    onEditar,
    onDeletar,
    transacoes,
    openSnack,
    handleClose,
    confirmOpen,
    setConfirmOpen,
    deleteHandle,
    onSalvar,
    openNewDialog,
    setOpenNewDialog
  } = useTransacao();

  function renderDialogs() {
    return (
      <>
        <ConfirmDialog
          title="Excluir Transação?"
          open={confirmOpen.open}
          onClose={() => setConfirmOpen({ open: false, value: undefined })}
          onConfirm={deleteHandle}
        >
          Tem certeza que deseja excluir esta transação?
        </ConfirmDialog>
        <SnackBarCustom
          severity={openSnack.type}
          handleClose={handleClose}
          openSnack={openSnack.open}
          variant="filled"
          vertical="top"
          horizontal="right"
          message={openSnack.message}
        />
      </>
    );
  }

  return (
    <div className="w-full flex-col">
      {renderDialogs()}
      <div className="flex w-full justify-end mr-5">
        <DialogNovaTransacao open={openNewDialog.open} setOpenNewDialog={setOpenNewDialog} onSalvar={onSalvar}/>
      </div>
      <div>
        <GridCustom
          columns={createColumns(onEditar, onDeletar)}
          rows={transacoes}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
