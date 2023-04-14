import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { IAcao } from "@/models/acao.model";

const columns: GridColDef[] = [
  {
    field: "imagem",
    headerName: "",
    width: 90,
    editable: false,
    renderCell: (params) => <img src={params.value} />,
  },
  { field: "codigo", headerName: "CÓDIGO", width: 150, editable: false },
  {
    field: "pl",
    headerName: "P/L",
    type: "number",
    width: 90,
    editable: false,
  },
  {
    field: "pvp",
    headerName: "P/VP",
    type: "number",
    width: 90,
    editable: false,
  },
  {
    field: "dividend_yield",
    headerName: "Div.Yield",
    type: "number",
    width: 90,
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
    type: "number",
    width: 90,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
  {
    id: 1,
    codigo: "BBAS3",
    imagem: "/img/acoes/331.jpg",
    pl: 10.5,
    pvp: 1.8,
    dividend_yield: 10.5,
    roe: 25.1,
  },
];

export default function AcoesListar() {
  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
