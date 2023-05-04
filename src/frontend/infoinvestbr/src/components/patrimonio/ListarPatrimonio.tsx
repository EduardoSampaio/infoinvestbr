import { IPatrimonio } from "@/models/patrimonio.model";
import {
  GridCellParams,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import Image from "next/image";
import { useState, useEffect } from "react";
import GridCustom from "../shared/GridCustom";
import clsx from "clsx";
import { Box } from "@mui/material";
import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from "react-icons/hi";
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from "react-icons/hi2";
import { ITotalizacao } from "@/models/totalizacao.model";

function cellRenderArrows(
  value: number,
  formatador: "%" | "R$",
  position: "inicio" | "fim"
) {
  const valueFormatted = Number(value).toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });

  const inicio = position === "inicio" ? "hidden" : "";
  const fim = position === "fim" ? "hidden" : "";

  if (value >= 0) {
    return (
      <>
        <HiOutlineArrowLongUp className="text-green-500 " />
        <h2
          className={`text-green-500 ${inicio}`}
        >{`${formatador}${valueFormatted}`}</h2>
        <h2
          className={`text-green-500 ${fim}`}
        >{`${valueFormatted}${formatador}`}</h2>
      </>
    );
  } else {
    return (
      <>
        <HiOutlineArrowLongDown className="text-red-500 " />
        <h2
          className={`text-red-500 ${inicio}`}
        >{`${formatador}${valueFormatted}`}</h2>
        <h2
          className={`text-red-500 ${fim}`}
        >{`${valueFormatted}${formatador}`}</h2>
      </>
    );
  }
}

const columns: GridColDef[] = [
  {
    field: "imagem",
    headerName: "#",
    width: 50,
    editable: false,
    sortable: false,
    renderCell: (params) => {
      const image =
        params.value == "" ? "/img/fiis.svg" : `/img/acoes/${params.value}.jpg`;
      return (
        <Image alt="imagem ações" src={image} width={"40"} height={"40"} />
      );
    },
  },
  {
    field: "categoria",
    headerName: "Categoria",
    type: "string",
    width: 130,
    editable: false,
  },
  { field: "codigo_ativo", headerName: "Código", width: 80, editable: false },
  {
    field: "preco",
    headerName: "Preço",
    type: "number",
    width: 80,
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
  {
    field: "preco_medio",
    headerName: "Preço Médio",
    type: "number",
    width: 120,
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
  {
    field: "quantidade",
    headerName: "Quantidade",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 120,
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
  {
    field: "variacao_total",
    headerName: "Ganhos/Perdas",
    type: "string",
    width: 150,
    editable: false,
    renderCell: (params) => {
      if (params.value == null) {
        return "";
      }
      return cellRenderArrows(params.value, "R$", "fim");
    },
  },
  {
    field: "rentabilidade",
    headerName: "Rentabilidade",
    type: "string",
    width: 120,
    editable: false,
    renderCell: (params) => {
      if (params.value == null) {
        return "";
      }
      return cellRenderArrows(params.value, "%", "inicio");
    },
  },
  {
    field: "percentual_ativo",
    headerName: "% Ativo",
    type: "string",
    width: 100,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value).toLocaleString("pt-BR", {
        maximumFractionDigits: 2,
      });
      return `${valueFormatted}%`;
    },
  },
  {
    field: "percentual_carteira",
    headerName: "% Carteira",
    type: "string",
    width: 100,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      const valueFormatted = Number(params.value).toLocaleString("pt-BR", {
        maximumFractionDigits: 2,
      });
      return `${valueFormatted}%`;
    },
  },
];

function renderGridsAtivo(row: IPatrimonio[], titulo: string) {
  return (
    <div
      className={`flex flex-col h-auto
      rounded-xl border-2 mt-5 
      dark:border-gray-600
      w-full
      `}
    >
      <div className={`w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-t-lg`}>
        <h3
          className={`text-sm font-semibold text-gray-600 dark:text-white m-2.5`}
        >
          {titulo}
        </h3>
      </div>
      <div className={`w-full flex flex-wrap min-h-[400px]`}>
        <GridCustom columns={columns} rows={row} showToolBar={false} />
      </div>
    </div>
  );
}

function renderTotalizacao(row: ITotalizacao) {
  return (
    <div
        className={`flex flex-col h-auto
            rounded-xl border-2 mt-5 
            dark:border-gray-600
            w-full
            `}
      >
        <div
          className={`w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-t-lg`}
        >
          <h3
            className={`text-sm font-semibold text-gray-600 dark:text-white m-2.5`}
          >
            Totalização
          </h3>
        </div>
        <div className={`w-full flex flex-wrap min-h-[200px]`}>
          <div>
            <h2>Total Ganho/Perda Ações</h2>
            <h2>
              R$
              {row.ganho_acoes?.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
          <div>
            <h2>Rentabilidade em Ações</h2>
            <h2>
              {row.total_porcentagem_acao?.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
              })}
              %
            </h2>
          </div>
          <div>
            <h2>Total Ações</h2>
            <h2>
              R$
              {row.total_acao?.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>
      </div>
  )
}

export default function ListaPatrimonio() {
  const [visible, setVisible] = useState<"hidden" | "">("");
  const [row, setRow] = useState<ITotalizacao>({ acoes: [], fundos: [] });

  useEffect(() => {
    const fetchData = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      const data = await fetch(
        `${API_HOST}/transacoes/{usuarios_id}/patrimonio?usuario_id=146dde84-bc5a-4e9a-bcd7-44f221b63cda`
      );
      return await data.json();
    };

    fetchData()
      .then((json) => {
        setRow({
          acoes: json.result.acoes,
          fundos: json.result.fundos,
          ganho_acoes: json.result.ganho_acoes,
          ganho_fundo: json.result.ganho_fundo,
          total_patrimonio: json.result.total_patrimonio,
          total_porcentagem_acao: json.result.total_porcentagem_acao,
          total_porcentagem_fundo: json.result.total_porcentagem_fundo,
          total_acao: json.result.total_acao,
          total_fundo: json.result.total_fundo,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const changeVisible = () => {
    if (visible === "") {
      setVisible("hidden");
    } else {
      setVisible("");
    }
  };

  return (
    <div className="w-full px-5 py-5">
      {renderTotalizacao(row)}
      {renderGridsAtivo(row.acoes, "Ações")}
      {renderGridsAtivo(row.fundos, "Fundos Imobiliários")}
    </div>
  );
}
