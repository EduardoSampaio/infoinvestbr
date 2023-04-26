import * as React from "react";
import {
  GridColDef,
  GridEventListener,
  GridValueFormatterParams,
  ptBR,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import GridCustom from "../shared/GridCustom";
import { useEffect, useState } from "react";
import { IAcao } from "@/models/acao.model";
const columns: GridColDef[] = [
  {
    field: "imagem",
    headerName: "#",
    editable: false,
    sortable: false,
    renderCell: (params) => (
      <img src={params.value == '/img/acoes/None.jpg' ? '/img/acao.svg' : params.value } width="40px" height="40px" />
    ),
  },
  { field: "codigo", headerName: "CÓDIGO", minWidth: 75, editable: false },
  {
    field: "pl",
    headerName: "P/L",
    type: "number",
    editable: false,
  },
  {
    field: "pvp",
    headerName: "P/VP",
    type: "number",
    minWidth: 20,
    editable: false,
  },
  {
    field: "dividend_yield",
    headerName: "Div.Yield",
    type: "number",
    minWidth: 80,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value * 100).toLocaleString();
      return `${valueFormatted}%`;
    },
  },
  {
    field: "roe",
    headerName: "ROE",
    type: "string",
    minWidth: 50,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value * 100).toLocaleString();
      return `${valueFormatted}%`;
    },
  },
  {
    field: "setor",
    headerName: "Setor",
    type: "string",
    minWidth: 200,
    editable: false,
  },
];

export default function AcoesListar() {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const router =useRouter();
  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    router.push(`/acoes/${params.row.codigo}/detalhes`)
  };
  const [rows, setRows] = useState<IAcao[]>([])

  const fetchData = async () => {
    const data = await fetch(`${API_HOST}/analises/acao?skip=0&limit=500`);
    return await data.json();
  }
 
  useEffect(() => { 
    fetchData()
    .then((json) => setRows(json.result))
    .catch();
  },[])

  return (
    <div className="w-full flex">
        <GridCustom columns={columns} rows={rows} handleEvent={handleEvent}/>
    </div>
    );
}
