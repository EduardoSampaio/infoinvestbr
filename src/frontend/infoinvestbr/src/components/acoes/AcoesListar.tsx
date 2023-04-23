import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { IAcao } from "@/models/acao.model";
import useAppData from "@/hooks/useAppData";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "imagem",
    headerName: "",
    width: 50,
    editable: false,
    renderCell: (params) => (
      <img src={params.value} width="20px" height="20px" />
    ),
  },
  { field: "codigo", headerName: "CÓDIGO", width: 80, editable: false },
  {
    field: "pl",
    headerName: "P/L",
    type: "number",
    minWidth: 100,
    editable: false,
    resizable: true,
  },
  {
    field: "pvp",
    headerName: "P/VP",
    type: "number",
    minWidth: 100,
    editable: false,
    resizable: true,
  },
  {
    field: "dividend_yield",
    headerName: "Div.Yield",
    type: "number",
    minWidth: 100,
    editable: false,
    resizable: true,
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
    minWidth: 100,
    editable: false,
    resizable: true,
  },
  {
    field: "setor",
    headerName: "SETOR",
    type: "string",
    minWidth: 100,
    editable: false,
    resizable: true,
  },
  {
    field: "subsetor",
    headerName: "SUBSETOR",
    type: "string",
    minWidth: 100,
    editable: false,
    resizable: true,
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
    setor: "Financeiro",
    subsetor: "Financeiro",
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
  const { tema } = useAppData();
  const [color, setColor] = useState<"white" | "black">("white");

  useEffect(() => {
    if (tema === "dark") {
      setColor("white");
    } else {
      setColor("black");
    }
  }, [tema]);

  return (
    <div className="flex w-full">
      <div className="flex w-full my-20">
        <div style={{ height: 370, width: "95%" }}>
          <DataGrid
            sx={{ color: `${color}` }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}
