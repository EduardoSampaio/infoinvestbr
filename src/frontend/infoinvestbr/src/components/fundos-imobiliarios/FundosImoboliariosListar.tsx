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
import { useEffect, useState } from "react";
const columns: GridColDef[] = [
  {
    field: "imagem",
    headerName: "#",
    width: 50,
    editable: false,
    sortable: false,
    renderCell: (params) => (
      <img src={'/img/fiis.svg'} width="40px" height="40px" />
    ),
  },
  { field: "codigo_do_fundo", headerName: "CÓDIGO", width: 80, editable: false },
  {
    field: "setor",
    headerName: "Setor",
    type: "string",
    minWidth: 150,
    editable: false,
  },
  {
    field: "p_vpa",
    headerName: "P/VPA",
    type: "number",
    minWidth: 100,
    editable: false,
  },
  {
    field: "dividend_yield",
    headerName: "Div.Yield",
    type: "number",
    minWidth: 100,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value * 100).toLocaleString();
      return `${valueFormatted} %`;
    },
  },
  {
    field: "dividendo",
    headerName: "Dividendo",
    type: "string",
    minWidth: 100,
    editable: false,
  },
  {
    field: "liquidez_diaria",
    headerName: "Liquidez",
    type: "number",
    minWidth: 100,
    editable: false,
  },
  {
    field: "patrimonio_liq",
    headerName: "Patrimônio",
    type: "number",
    minWidth: 150,
    editable: false,
  },
];

export default function FundosImoboliariosListar() {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const router =useRouter();
  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(params.row);
    router.push(`/fundos-imobiliarios/${params.row.codigo_do_fundo}/detalhes`)
  };

  const [rows, setRows] = useState<any[]>([])

  const fetchData = async () => {
    const data = await fetch(`${API_HOST}/analises/fundos-imobiliarios?skip=0&limit=500`);
    return await data.json();
  }
 
  useEffect(() => { 
    fetchData()
    .then((json) => setRows(json.result))
    .catch();
  },[])

  return (
    <div className="w-full flex">
      <div className="w-full">
          <GridCustom columns={columns} rows={rows} handleEvent={handleEvent}/>
      </div>
    </div>
    );
}
