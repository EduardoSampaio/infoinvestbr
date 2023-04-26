import { useRouter } from "next/router";
import Image from "next/image";
import Indicadores from "./Indicadores";
import BoxIndicador from "./BoxIndicador";
import { Chip } from "@mui/material";
import { useRef, useState } from "react";
import { ReactECharts, ReactEChartsProps } from "../shared/ReactECharts";
import * as echarts from 'echarts';

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];

let data = [Math.random() * 300];

for (let i = 1; i < 20000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
  data.push(Math.round((Math.random() - 0.5) * 2 + data[i - 1]));
}

const option: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "axis",
    position: function (pt: any) {
      return [pt[0], "10%"];
    },
  },
  title: {
    left: "center",
    text: "",
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: date,
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: "Fake Data",
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
      data: data,
    },
  ],
};

export default function DetalhesAcoes() {
  const router = useRouter();
  const codigo = router.query.codigo?.toString();
  const echart = useRef(null);
  const [chartElement, setChartElement] = useState(echart);

  return (
    <div className="flex flex-wrap m-5">
      <div className="flex flex-row w-full">
        <Image
          alt={`detalhes ${codigo}`}
          src="/img/acoes/327.jpg"
          width={"50"}
          height={"50"}
        />
        <div>
          <h2 className="text-xl font-semibold ml-2.5">{codigo}</h2>
          <h4 className="text-xs font-semibold ml-2.5">Banco ABC</h4>
        </div>
        <div className="flex w-full justify-end mr-8">
          <Chip
            label="Financeiro"
            className="text-sm font-semibold text-gray-600 dark:text-white m-2.5"
          />
        </div>
      </div>
      <Indicadores titulo="Indicadores Fundamentalistas">
        <BoxIndicador valor="R$ 16,10" indicador="Preço" />
        <BoxIndicador valor="6,10%" indicador="D.Y" />
        <BoxIndicador valor="6,10" indicador="P/L" />
        <BoxIndicador valor="1,10" indicador="P/VP" />
        {/* <BoxIndicador valor="6,10" indicador="LPA"/>
          <BoxIndicador valor="6,10" indicador="VPA"/> */}
        <BoxIndicador valor="6,10" indicador="PSR" />
        <BoxIndicador valor="6,10" indicador="P/ATIVO" />
        <BoxIndicador valor="6,10" indicador="P/CAP.GIRO" />
        <BoxIndicador valor="6,10" indicador="P/ATIVO CIRC. LIQ." />
        <BoxIndicador valor="6,10" indicador="EV/EBIT" />
        <BoxIndicador valor="6,10" indicador="EV/EBITA" />
        <BoxIndicador valor="6,10" indicador="MARGEM EBIT" />
        <BoxIndicador valor="6,10" indicador="MARGEM LIQ" />
        <BoxIndicador valor="6,10" indicador="LIQ.CORRENTE" />
        <BoxIndicador valor="6,10" indicador="ROE" />
        <BoxIndicador valor="6,10" indicador="ROIC" />
        <BoxIndicador valor="6,10" indicador="PATRIM.LIQ." />
        <BoxIndicador valor="6,10" indicador="DIV.BRUTA.PATRIM." />
        <BoxIndicador valor="6,10" indicador="CRESC.REC.5A" />
      </Indicadores>
      <Indicadores titulo="Histórico de Cotações">
        <div className="w-full">
          <ReactECharts option={option} />
        </div>
      </Indicadores>
    </div>
  );
}
