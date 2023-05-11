import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";
import Image from "next/image";
import { useState, useEffect } from "react";
import GridCustom from "../shared/GridCustom";
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from "react-icons/hi2";
import { ITotalizacao } from "@/models/totalizacao.model";
import DashboardCarteira from "./DashboardCarteira";
import useAuth from "@/data/hooks/useAuth";
import useFetchApi from "@/data/hooks/useFetchApi";
import useNotification from "@/data/hooks/useNotification";

function formatNumberWithArrows(
  value?: number,
  formatador?: "%" | "R$",
  position?: "inicio" | "fim",
  cssIcon?: string
) {
  if (value === undefined) {
    return "";
  }

  const valueFormatted = Number(value)?.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  if (value !== undefined && value >= 0) {
    return (
      <>
        <HiOutlineArrowLongUp className={`text-green-500 ${cssIcon}`} />
        {position === "inicio" ? (
          <h2
            className={`text-green-500`}
          >{`${formatador} ${valueFormatted}`}</h2>
        ) : (
          <h2
            className={`text-green-500`}
          >{`${valueFormatted} ${formatador}`}</h2>
        )}
      </>
    );
  } else {
    return (
      <>
        <HiOutlineArrowLongDown className={`text-red-500 ${cssIcon}`} />
        {position === "inicio" ? (
          <h2 className={`text-red-500`}>{`${formatador}${valueFormatted}`}</h2>
        ) : (
          <h2 className={`text-red-500`}>{`${valueFormatted}${formatador}`}</h2>
        )}
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
    width: 120,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (params.value == null) {
        return "";
      }

      return `R$ ${params.value.toLocaleString("pt-BR", {
        maximumFractionDigits: 2,
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
        maximumFractionDigits: 2,
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
        maximumFractionDigits: 2,
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
      return formatNumberWithArrows(params.value, "R$", "inicio");
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
      return formatNumberWithArrows(params.value, "%", "fim");
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
        minimumFractionDigits: 2,
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
        minimumFractionDigits: 2,
      });
      return `${valueFormatted}%`;
    },
  },
];

function renderGridsAtivoAcao(row: ITotalizacao, titulo: string, isLoading: boolean) {
  return (
    <div
      className={`flex flex-col h-auto
    rounded-xl border-2 mt-5 
    dark:border-gray-600
    w-full
    `}
    >
      <div className={`w-full bg-gray-200 dark:bg-gray-800 rounded-t-lg`}>
        <h3
          className={`text-sm font-semibold text-gray-600 dark:text-white m-2.5`}
        >
          {titulo}
        </h3>
      </div>
      <div className={`w-full flex flex-wrap`}>
        <div
          className={`w-full mx-10 mt-5 border-t border-l border-r
        flex justify-end dark:border-gray-500
      `}
        >
          <div
            className="border-l dark:border-gray-500
          flex flex-col justify-center items-center w-1/6"
          >
            <h2 className="text-sm text-gray-500 dark:text-white">
              Número de Ativos
            </h2>
            <div className="flex">{row.acoes?.length}</div>
          </div>
          <div
            className={`border-l px-10 dark:border-gray-500
          flex flex-col justify-center
        `}
          >
            <h2 className="text-sm text-gray-500 dark:text-white">
              Ganhos Totais
            </h2>
            <div className="flex">
              {formatNumberWithArrows(row?.ganho_acoes, "R$", "inicio", "mt-1")}
            </div>
          </div>
          <div
            className="border-l dark:border-gray-500
          flex flex-col justify-center items-center w-1/6"
          >
            <h2 className="text-sm text-gray-500 dark:text-white">
              Rentabilidade
            </h2>
            <div className="flex">
              {formatNumberWithArrows(
                row?.total_porcentagem_acao,
                "%",
                "fim",
                "mt-1"
              )}
            </div>
          </div>
          <div
            className="border-l border-r dark:border-gray-500
          flex flex-col justify-center items-center w-1/6"
          >
            <h2 className="text-sm text-gray-500 dark:text-white">Total</h2>
            R$
            {row.total_acao?.toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </div>
        </div>
        <GridCustom
          columns={columns}
          rows={row?.acoes}
          showToolBar={false}
          className="px-10 pt-0"
          disableRowSelectionOnClick
          id={"codigo_ativo"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

function renderGridsAtivoFundo(row: ITotalizacao, titulo: string, isLoading: boolean) {
  return (
    <div
      className={`flex flex-col h-auto
      rounded-xl border-2 mt-5 
      dark:border-gray-600
      w-full
      `}
    >
      <div className={`w-full bg-gray-200 dark:bg-gray-800 rounded-t-lg`}>
        <h3
          className={`text-sm font-semibold text-gray-600 dark:text-white m-2.5`}
        >
          {titulo}
        </h3>
      </div>
      <div className={`w-full flex flex-wrap`}>
        <div
          className={`w-full mx-10 mt-5 border-t border-l border-r
          flex justify-end dark:border-gray-500
        `}
        >
          <div
            className="border-l dark:border-gray-500
            flex flex-col justify-center items-center w-1/6"
          >
            <h2 className="text-sm text-gray-500 dark:text-white">
              Número de Ativos
            </h2>
            <div className="flex">{row?.fundos?.length}</div>
          </div>
          <div
            className={`border-l px-10 dark:border-gray-500
            flex flex-col justify-center
          `}
          >
            <h2 className="text-sm text-gray-500 dark:text-white">
              Ganhos Totais
            </h2>
            <div className="flex">
              {formatNumberWithArrows(row?.ganho_fundo, "R$", "inicio", "mt-1")}
            </div>
          </div>
          <div
            className="border-l dark:border-gray-500
            flex flex-col justify-center items-center w-1/6"
          >
            <h2 className="text-sm text-gray-500 dark:text-white">
              Rentabilidade
            </h2>
            <div className="flex">
              {formatNumberWithArrows(
                row?.total_porcentagem_fundo,
                "%",
                "fim",
                "mt-1"
              )}
            </div>
          </div>
          <div
            className="border-l border-r dark:border-gray-500
            flex flex-col justify-center items-center w-1/6"
          >
            <h2 className="text-sm text-gray-500 dark:text-white">Total</h2>
            R$
            {row?.total_fundo?.toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </div>
        </div>
        <GridCustom
          columns={columns}
          rows={row?.fundos}
          showToolBar={false}
          className="px-10 pt-0"
          disableRowSelectionOnClick
          id={"codigo_ativo"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function ListaPatrimonio() {
  const [row, setRow] = useState<any>({ acoes: [], fundos: [] });
  const [rowChart, setRowChart] = useState<any>({});
  const { usuario } = useAuth();
  const { find } = useFetchApi();
  const {setVisible} = useNotification()
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      return await find(
        `${API_HOST}/transacoes/{usuarios_id}/patrimonio?usuario_id=${usuario?.id}`
      );
    };

    if (usuario?.id) {
      fetchData()
        .then((json) => {
          const patrimonio = json.result.patrimonio;
          const chart = json.result.chart;
          setRowChart(chart);
          setRow({
            acoes: patrimonio.acoes,
            fundos: patrimonio.fundos,
            ganho_acoes: patrimonio.ganho_acoes,
            ganho_fundo: patrimonio.ganho_fundo,
            total_patrimonio: patrimonio.total_patrimonio,
            total_porcentagem_acao: patrimonio.total_porcentagem_acao,
            total_porcentagem_fundo: patrimonio.total_porcentagem_fundo,
            total_acao: patrimonio.total_acao,
            total_fundo: patrimonio.total_fundo,
            total_investido: patrimonio.total_investido,
            rentabilidade_total: patrimonio.rentabilidade_total,
            ganhos_totais: patrimonio.ganhos_totais,
          });
        }).catch(result => { 
          setVisible?.( `${result.error}`,'error')
      }).finally(() => setLoading(false))
    }
  }, [usuario?.id]);

  return (
    <div className="w-full px-5 py-5">
      <div className="flex justify-around">
        <div
          className={`flex xl:basis-[22%] lg:basis-[25%] md:basis-[100%] sm:basis-[100%]  min-h-[80px] h-auto
          border-2 dark:border-gray-600 m-2.5 justify-center items-center`}
        >
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className=" text-gray-400">Total Bruto</h3>
            <h2 className="font-semibold">
              R${" "}
              {row?.total_patrimonio?.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        <div
          className={`flex xl:basis-[22%] lg:basis-[25%] md:basis-[100%] sm:basis-[100%]  min-h-[80px] h-auto
          border-2 dark:border-gray-600 m-2.5 justify-center items-center`}
        >
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className=" text-gray-400">Total Investido</h3>
            <h2 className="font-semibold">
              R${" "}
              {row?.total_investido?.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        <div
          className={`flex xl:basis-[22%] lg:basis-[25%] md:basis-[100%] sm:basis-[100%]  min-h-[80px] h-auto
          border-2 dark:border-gray-600 m-2.5 justify-center items-center`}
        >
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className="text-gray-400">Ganhos totais</h3>
            <div className="flex">
              {formatNumberWithArrows(
                row?.ganhos_totais,
                "R$",
                "inicio",
                "mt-0.5"
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex xl:basis-[22%] lg:basis-[25%] md:basis-[100%] sm:basis-[100%]  min-h-[80px] h-auto
          border-2 dark:border-gray-600 m-2.5 justify-center items-center`}
        >
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className=" text-gray-400">Rentabilidade</h3>
            <div className="flex">
              {formatNumberWithArrows(
                row?.rentabilidade_total,
                "%",
                "fim",
                "mt-0.5"
              )}
            </div>
          </div>
        </div>
      </div>
      <DashboardCarteira rows={rowChart} isLoading={isLoading}/>
      {renderGridsAtivoAcao(row, "Ações" , isLoading)}
      {renderGridsAtivoFundo(row, "Fundos Imobiliários", isLoading)}
    </div>
  );
}
