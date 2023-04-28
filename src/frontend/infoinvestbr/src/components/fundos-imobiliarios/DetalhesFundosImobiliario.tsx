import { useRouter } from "next/router";
import Image from "next/image";
import BoxIndicador from "../shared/BoxIndicador";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactECharts, ReactEChartsProps } from "../shared/ReactECharts";
import * as echarts from "echarts";
import BasicTable from "../shared/BasicTable";
import { IAcao } from "@/models/acao.model";
import { IFundoImobiliario } from "@/models/fundos.model";
import Indicadores from "../shared/Indicadores";
import { TOOLTIP_MSG } from "../acoes/tooltip";

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
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
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
      show: true,
      axisLabel: {
        formatter: "R$ {value}",
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        data: series,
        type: "bar",
        barWidth: 20,
      },
    ],
  };
  return optionBar;
}

function renderizarIndicadores(fundo: IFundoImobiliario) {
  return (
    <Indicadores titulo="Indicadores">
      <BoxIndicador
        valor={`R$${fundo?.preco}`}
        indicador="Preço"
        tooltip={TOOLTIP_MSG.PRECO}
      />
      <BoxIndicador
        valor={`${fundo?.dividend_yield}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.liquidez_diaria}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.p_vpa}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.dy_ano}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.quantidade_ativos}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.vacancia_financeira}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.vpa}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.rentab_periodo}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

      <BoxIndicador
        valor={`${fundo?.rentab_acumulada}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

     <BoxIndicador
        valor={`${fundo?.variacao_patrimonial}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

    <BoxIndicador
        valor={`${fundo?.variacao_patrimonial}%`}
        indicador="D.Y"
        tooltip={TOOLTIP_MSG.DY}
      />

    </Indicadores>
  );
}

export default function DetalhesFundosImobiliario() {
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const router = useRouter();
  const codigo = router.query.codigo?.toString();

  const [fundo, setFundo] = useState<IFundoImobiliario>({});
  const [chartLine, setChartLine] = useState<any>({
    datas: "",
    fechamento: "",
  });
  const [chartBar, setChartBar] = useState<any>({ datas: "", valores: "" });

  const fetchDataIndicadores = async () => {
    if (codigo === undefined) {
      return false;
    }
    const data = await fetch(
      `${API_HOST}/analises/fundos-imobiliarios/${codigo}`
    );
    return await data.json();
  };

  const fetchDataGrafico = async () => {
    if (codigo === undefined) {
      return false;
    }
    const data = await fetch(
      `${API_HOST}/cotacao/codigo-ativo/${codigo}/chart?periodo=10y&intervalo=1mo`
    );
    return await data.json();
  };

  const fetchDataBarGrafico = async () => {
    if (codigo === undefined) {
      return false;
    }
    const data = await fetch(
      `${API_HOST}/cotacao/historico/dividendos-mensal/${codigo}`
    );
    return await data.json();
  };

  useEffect(() => {
    fetchDataIndicadores()
      .then((json) => setFundo(json.result))
      .catch();

    fetchDataGrafico()
      .then((json) => setChartLine(json.result))
      .catch();

    fetchDataBarGrafico()
      .then((json) => setChartBar(json.result))
      .catch();
  }, [router]);

  return (
    <div className="flex flex-wrap m-5">
      <div className="flex flex-row w-full">
        <Image
          alt={`detalhes ${codigo}`}
          src={"/img/fiis.svg"}
          width={"50"}
          height={"50"}
        />
        <div className="w-[500px]">
          <h2 className="text-xl font-semibold ml-2.5">{codigo}</h2>
          <h4 className="text-xs font-semibold ml-2.5">{fundo?.nome}</h4>
          <h4 className="text-xs font-semibold ml-2.5">{fundo?.cnpj}</h4>
        </div>
        <div className="flex w-full justify-end mr-8">
          <Chip
            label={fundo?.setor}
            className="text-sm font-semibold text-gray-600 dark:text-white m-2.5"
          />
        </div>
      </div>
      {renderizarIndicadores(fundo)}
      <Indicadores titulo="Histórico de Cotações">
        <div className="w-full">
          <ReactECharts
            option={renderChartHistoricoCotacoes(
              chartLine?.datas,
              chartLine?.fechamento
            )}
          />
        </div>
      </Indicadores>
      <Indicadores titulo="Histórico Pagamento de Dividendo Mensais">
        <div className="w-full">
          <ReactECharts
            option={renderChartHistoricoPagamento(
              chartBar?.datas,
              chartBar?.valores
            )}
          />
        </div>
      </Indicadores>
    </div>
  );
}
