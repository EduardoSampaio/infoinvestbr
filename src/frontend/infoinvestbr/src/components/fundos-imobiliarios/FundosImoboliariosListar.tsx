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
import Image from "next/image";
import useAuth from "@/data/hooks/useAuth";
import useAppTheme from "@/data/hooks/useAppTheme";
import useFetchApi from "@/data/hooks/useFetchApi";

const columns: GridColDef[] = [
  {
    field: "imagem",
    headerName: "#",
    width: 50,
    editable: false,
    sortable: false,
    renderCell: (params) => (
      <Image src={'/img/fiis.svg'} alt="imagem fiis" width={"40"} height={"40"} />
    ),
  },
  { field: "codigo", headerName: "CÓDIGO", width: 80, editable: false },
  {
    field: "setor",
    headerName: "Setor",
    type: "string",
    width: 150,
    editable: false,
  },
  {
    field: "p_vpa",
    headerName: "P/VPA",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "dividend_yield",
    headerName: "Div.Yield",
    type: "number",
    width: 100,
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
    width: 100,
    editable: false,
  },
  {
    field: "liquidez_diaria",
    headerName: "Liquidez",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "patrimonio_liq",
    headerName: "Patrimônio",
    type: "number",
    width: 150,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      return `R$ ${params.value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })} `;
    },
  },
];

export default function FundosImobiliariosListar() {
  const router =useRouter();
  const {headers} = useAuth();
  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    router.push(`/fundos-imobiliarios/${params.row.codigo}/detalhes`)
  };

  const [rows, setRows] = useState<any[]>([])
  const {find} = useFetchApi();
 
  useEffect(() => { 
  const fetchData = async () => {
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    return await find(`${API_HOST}/analises/fundos-imobiliarios?skip=0&limit=500`);
  }
  
    fetchData()
    .then((json) => setRows(json.result))
    .catch();
  },[])

  return (
    <div className="w-full flex">
      <div className="w-full">
          <GridCustom columns={columns} rows={rows} onRowClick={handleEvent} showToolBar={true}/>
      </div>
    </div>
    );
}
