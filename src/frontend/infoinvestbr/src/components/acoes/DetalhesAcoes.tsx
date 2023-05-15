import { useRouter } from "next/router";
import Image from "next/image";
import CardTitle from "../shared/Indicadores";
import BoxIndicador from "../shared/BoxIndicador";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactECharts, ReactEChartsProps } from "../shared/ReactECharts";
import * as echarts from "echarts";
import { TOOLTIP_MSG } from "./tooltip";
import { IAcao } from "@/models/acao.model";
import useFetchApi from "@/data/hooks/useFetchApi";
import Loading from "../shared/Loading";

function renderChartHistoricoCotacoes(datas: any[], series: any[]) {
  const option: ReactEChartsProps["option"] = {
    tooltip: {
      trigger: "axis",
      formatter: "R$ {c}",
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
      axisPointer: {
        type: "line",
      },
    },
    title: {
      left: "center",
      text: "",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: datas,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      axisLabel: {
        formatter: "R$ {value},00",
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 100,
        end: 0,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: "",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        data: series,
      },
    ],
  };
  return option;
}

function renderChartHistoricoPagamento(datas: any, series: any) {
  const optionBar: ReactEChartsProps["option"] = {
    tooltip: {
      trigger: "axis",
      valueFormatter(value) {
        return "R$" + Number(value).toFixed(2);
      },
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: datas,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "R$ {value}",
      },
    },
    series: [
      {
        data: series,
        type: "bar",
        barWidth: 50,
      },
    ],
  };
  return optionBar;
}

function renderizarIndicadores(acao: IAcao, isIndicadores: boolean) {
  return (
    <CardTitle titulo="Indicadores Fundamentalistas">
      {isIndicadores ? (
        <Loading />
      ) : (
        <>
          <BoxIndicador
            valor={`R$${acao?.preco}`}
            indicador="Preço"
            tooltip={TOOLTIP_MSG.PRECO}
          />
          <BoxIndicador
            valor={`${acao?.dividend_yield}%`}
            indicador="D.Y"
            tooltip={TOOLTIP_MSG.DY}
          />
          <BoxIndicador
            valor={`${acao?.pl}`}
            indicador="P/L"
            tooltip={TOOLTIP_MSG.PL}
          />
          <BoxIndicador
            valor={`${acao?.pvp}`}
            indicador="P/VP"
            tooltip={TOOLTIP_MSG.PVP}
          />
          {/* <BoxIndicador valor={`${acao.lpa}`} indicador="LPA" tooltip={TOOLTIP_MSG.LPA}/>
      <BoxIndicador valor={`${acao.vpa}`} indicador="VPA" tooltip={TOOLTIP_MSG.VPA}/> */}
          <BoxIndicador
            valor={`${acao?.psr}`}
            indicador="PSR"
            tooltip={TOOLTIP_MSG.PSR}
          />
          <BoxIndicador
            valor={`${acao?.p_ativo}`}
            indicador="P/ATIVO"
            tooltip={TOOLTIP_MSG.P_ATIVO}
          />
          <BoxIndicador
            valor={`${acao?.p_cap_giro}`}
            indicador="P/CAP.GIRO"
            tooltip={TOOLTIP_MSG.P_CAP_GIRO}
          />
          <BoxIndicador
            valor={`${acao?.p_ativ_circ_liq}`}
            indicador="P/ATIVO CIRC. LIQ."
            tooltip={TOOLTIP_MSG.P_ATIVO_CIRC}
          />
          <BoxIndicador
            valor={`${acao?.ev_ebit}`}
            indicador="EV/EBIT"
            tooltip={TOOLTIP_MSG.EV_BIT}
          />
          <BoxIndicador
            valor={`${acao?.ev_ebitda}`}
            indicador="EV/EBITA"
            tooltip={TOOLTIP_MSG.EV_EBITDA}
          />
          <BoxIndicador
            valor={`${acao?.margem_ebit}%`}
            indicador="MARGEM EBIT"
            tooltip={TOOLTIP_MSG.MARGEM_EBIT}
          />
          <BoxIndicador
            valor={`${acao?.margem_liquida}%`}
            indicador="MARGEM LIQ"
            tooltip={TOOLTIP_MSG.MARGEM_LIQ_EBIT}
          />
          <BoxIndicador
            valor={`${acao?.liq_corrente}`}
            indicador="LIQ.CORRENTE"
            tooltip={TOOLTIP_MSG.LIQ_CORRENTE}
          />
          <BoxIndicador
            valor={`${acao?.roe}%`}
            indicador="ROE"
            tooltip={TOOLTIP_MSG.ROE}
          />
          <BoxIndicador
            valor={`${acao?.roic}%`}
            indicador="ROIC"
            tooltip={TOOLTIP_MSG.ROIC}
          />
          {/* <BoxIndicador valor={`${acao.patrimonio_liquido}`} indicador="PATRIM.LIQ." tooltip={TOOLTIP_MSG.PATRIM_LIQ}/> */}
          <BoxIndicador
            valor={`${acao?.div_bruta_patrim}`}
            indicador="DIV.BRUTA.PATRIM."
            tooltip={TOOLTIP_MSG.DIVIDA_LIQUIDA_PATRIM_LIQ}
          />
          <BoxIndicador
            valor={`${acao?.cresc_rec_5a}%`}
            indicador="CRESC.REC.5A"
            tooltip={TOOLTIP_MSG.CAGR_RECEITA_5A}
          />
        </>
      )}
    </CardTitle>
  );
}

const dataDividendo = {
  columns: ["Data Pagamento", "Data Com", "Tipo", "Valor"],
  rows: [
    {
      ["Data Pagamento"]: "01/2023",
      ["Data Com"]: "01/2023",
      Tipo: "JCP",
      Valor: "1.50",
    },
    {
      ["Data Pagamento"]: "02/2023",
      ["Data Com"]: "02/2023",
      Tipo: "Dividendo",
      Valor: "1.25",
    },
    {
      ["Data Pagamento"]: "03/2023",
      ["Data Com"]: "03/2023",
      Tipo: "Dividendo",
      Valor: "3.20",
    },
    {
      ["Data Pagamento"]: "04/2023",
      ["Data Com"]: "04/2023",
      Tipo: "JCP",
      Valor: "0.01",
    },
    {
      ["Data Pagamento"]: "05/2023",
      ["Data Com"]: "05/2023",
      Tipo: "Dividendo",
      Valor: "0.02",
    },
    {
      ["Data Pagamento"]: "06/2023",
      ["Data Com"]: "06/2023",
      Tipo: "Dividendo",
      Valor: "0.50",
    },
    {
      ["Data Pagamento"]: "07/2023",
      ["Data Com"]: "07/2023",
      Tipo: "Dividendo",
      Valor: "0.75",
    },
    {
      ["Data Pagamento"]: "08/2023",
      ["Data Com"]: "08/2023",
      Tipo: "JCP",
      Valor: "1.50",
    },
    {
      ["Data Pagamento"]: "09/2023",
      ["Data Com"]: "09/2023",
      Tipo: "Dividendo",
      Valor: "1.25",
    },
    {
      ["Data Pagamento"]: "10/2023",
      ["Data Com"]: "10/2023",
      Tipo: "Dividendo",
      Valor: "3.20",
    },
    {
      ["Data Pagamento"]: "12/2023",
      ["Data Com"]: "12/2023",
      Tipo: "JCP",
      Valor: "0.01",
    },
  ],
};

function getImage(imagem?: string) {
  return imagem === undefined || imagem === "None"
    ? "/img/acao.svg"
    : `/img/acoes/${imagem}.jpg`;
}

export default function DetalhesAcoes() {
  const router = useRouter();
  const codigo = router.query.codigo?.toString();
  const [acao, setAcao] = useState<IAcao>({});
  const [chartLine, setChartLine] = useState<any>({
    datas: "",
    fechamento: "",
  });
  const [chartBar, setChartBar] = useState<any>({ datas: "", valores: "" });

  const [isIndicadores, setIsIndicadores] = useState<boolean>(true);
  const [isHistorico, setIsHistorico] = useState<boolean>(true);
  const [isPagamento, setIsPagamento] = useState<boolean>(true);

  const { find } = useFetchApi();

  useEffect(() => {
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const fetchDataIndicadores = async () => {
      return await find(`${API_HOST}/analises/acao/${codigo}`);
    };

    const fetchDataGrafico = async () => {
      return await find(
        `${API_HOST}/cotacao/codigo-ativo/${codigo}/chart?periodo=10y&intervalo=1mo`
      );
    };

    const fetchDataBarGrafico = async () => {
      return await find(
        `${API_HOST}/cotacao/historico/dividendos-anual/${codigo}`
      );
    };

    if (codigo !== undefined) {
      fetchDataIndicadores()
        .then((json) => setAcao(json.result))
        .finally(() => setIsIndicadores(false));

      fetchDataGrafico()
        .then((json) => setChartLine(json.result))
        .finally(() => setIsHistorico(false));

      fetchDataBarGrafico()
        .then((json) => setChartBar(json.result))
        .finally(() => setIsPagamento(false));
    }
  }, [router, codigo]);

  return (
    <div className="flex flex-wrap m-5">
      <div className="flex flex-row w-full">
        <Image
          alt={`detalhes ${codigo}`}
          src={getImage(acao?.imagem)}
          width={"50"}
          height={"50"}
        />
        <div className="w-[500px]">
          <h2 className="text-xl font-semibold ml-2.5">{codigo}</h2>
          <h4 className="text-xs font-semibold ml-2.5">{acao?.nome}</h4>
          <h4 className="text-xs font-semibold ml-2.5">{acao?.cnpj}</h4>
        </div>
        <div className="flex w-full justify-end mr-8">
          <Chip
            label={acao?.setor}
            className="text-sm font-semibold text-gray-600 dark:text-white m-2.5"
          />
        </div>
      </div>
      {renderizarIndicadores(acao, isIndicadores)}
      <CardTitle titulo="Histórico de Cotações">
        {isHistorico ? (
          <Loading />
        ) : (
          <div className="w-full">
            <ReactECharts
              option={renderChartHistoricoCotacoes(
                chartLine?.datas,
                chartLine?.fechamento
              )}
            />
          </div>
        )}
      </CardTitle>
      <CardTitle titulo="Histórico Pagamento de Dividendo Anuais">
        {isPagamento ? (
          <Loading />
        ) : (
          <div className="w-full">
            <ReactECharts
              option={renderChartHistoricoPagamento(
                chartBar?.datas,
                chartBar?.valores
              )}
            />
          </div>
        )}
      </CardTitle>
      {/* <CardTitle titulo="Histórico de Dividendos do Ano">
        <div className="w-full h-[500px] overflow-y-scroll">
          <BasicTable
            columns={dataDividendo.columns}
            rows={dataDividendo.rows}
          />
        </div>
      </CardTitle> */}
    </div>
  );
}
