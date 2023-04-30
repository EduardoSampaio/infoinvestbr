import {
  GridColDef,
  GridDeleteIcon,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import Image from "next/image";
import GridCustom from "../shared/GridCustom";
import useTransacao from "@/hooks/useTransacao";
import { IconButton, TextField } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import FormDialog from "./DialogEditarTransacao";

function createColumns(onOpenEditar: any, onDeletar: any): GridColDef[] {
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
      width: 100,
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
      width: 100,
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
          <FormDialog transacao={params.row}/>
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
  const {onOpenEditar, onDeletar, transacoes } = useTransacao();

  return (
    <div className="w-full flex">
      <GridCustom
        columns={createColumns(onOpenEditar, onDeletar)}
        rows={transacoes}
        disableRowSelectionOnClick
      />
    </div>
  );
}
