import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridValueFormatterParams,
  ptBR,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import GridCustom from "../shared/GridCustom";
const columns: GridColDef[] = [
  {
    field: "imagem",
    headerName: "#",
    width: 50,
    editable: false,
    sortable: false,
    renderCell: (params) => (
      <img src={params.value} width="20px" height="20px" />
    ),
  },
  { field: "codigo", headerName: "CÓDIGO", width: 130, editable: false },
  {
    field: "pl",
    headerName: "P/L",
    type: "number",
    minWidth: 20,
    editable: false,
  },
  {
    field: "pvp",
    headerName: "P/VP",
    type: "number",
    minWidth: 120,
    editable: false,
  },
  {
    field: "dividend_yield",
    headerName: "Div.Yield",
    type: "number",
    minWidth: 130,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value).toLocaleString();
      return `${valueFormatted} %`;
    },
  },
  {
    field: "roe",
    headerName: "ROE",
    type: "string",
    minWidth: 50,
    editable: false,
  },
  {
    field: "setor",
    headerName: "Setor",
    type: "string",
    minWidth: 150,
    editable: false,
  },
  {
    field: "subsetor",
    headerName: "SubSetor",
    type: "string",
    minWidth: 150,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    codigo: "TAEE11",
    imagem: "/img/acoes/480.jpg",
    pl: 4.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Utlidade Pública",
    subsetor: "Energia Elétrica",
  },
  {
    id: 2,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 3,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 4,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 5,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 6,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 7,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 8,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 9,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 10,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 11,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
  {
    id: 12,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
    setor: "Financeiro",
    subsetor: "Financeiro",
  },
];

export default function AcoesListar() {
  const router =useRouter();
  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params.row);
    router.push(`/acoes/${params.row.codigo}/detalhes`)
  };

  return (
    <div className="w-full flex">
      <div className="w-full">
          <GridCustom columns={columns} rows={rows} handleEvent={handleEvent}/>
      </div>
    </div>
    );
}
