import { useRouter } from "next/router";
import Image from "next/image";
import Indicadores from "./Indicadores";
import BoxIndicador from "./BoxIndicador";
import { Chip } from "@mui/material";
import { useRef, useState } from "react";
import { ReactECharts, ReactEChartsProps } from "../shared/ReactECharts";
import * as echarts from "echarts";
import BasicTable from "../shared/BasicTable";
import {TOOLTIP_MSG} from "./tooltip"

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

const optionBar: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "axis",
    position: function (pt: any) {
      return [pt[0], "10%"];
    },
  },
  xAxis: {
    type: "category",
    data: ["2017", "2018", "2018", "2020", "2021", "2022", "2023"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [3.5, 2.25, 3.3, 5.5, 4.39, 4.5, 6.8],
      type: "bar",
      barWidth: 50,
    },
  ],
};

function renderizarIndicadores() {
  return (
    <Indicadores titulo="Indicadores Fundamentalistas">
      <BoxIndicador valor="R$ 16,10" indicador="Preço" tooltip={TOOLTIP_MSG.PRECO}/>
      <BoxIndicador valor="6,10%" indicador="D.Y" tooltip={TOOLTIP_MSG.DY}/>
      <BoxIndicador valor="6,10" indicador="P/L" tooltip={TOOLTIP_MSG.PL}/>
      <BoxIndicador valor="1,10" indicador="P/VP" tooltip={TOOLTIP_MSG.PVP}/>
      <BoxIndicador valor="6,10" indicador="LPA" tooltip={TOOLTIP_MSG.LPA}/>
      <BoxIndicador valor="6,10" indicador="VPA" tooltip={TOOLTIP_MSG.VPA}/>
      <BoxIndicador valor="6,10" indicador="PSR" tooltip={TOOLTIP_MSG.PSR}/>
      <BoxIndicador valor="6,10" indicador="P/ATIVO" tooltip={TOOLTIP_MSG.P_ATIVO}/>
      <BoxIndicador valor="6,10" indicador="P/CAP.GIRO" tooltip={TOOLTIP_MSG.P_CAP_GIRO}/>
      <BoxIndicador valor="6,10" indicador="P/ATIVO CIRC. LIQ." tooltip={TOOLTIP_MSG.P_ATIVO_CIRC}/>
      <BoxIndicador valor="6,10" indicador="EV/EBIT" tooltip={TOOLTIP_MSG.EV_BIT}/>
      <BoxIndicador valor="6,10" indicador="EV/EBITA" tooltip={TOOLTIP_MSG.EV_EBITDA}/>
      <BoxIndicador valor="6,10" indicador="MARGEM EBIT" tooltip={TOOLTIP_MSG.MARGEM_EBIT}/>
      <BoxIndicador valor="6,10" indicador="MARGEM LIQ" tooltip={TOOLTIP_MSG.MARGEM_LIQ_EBIT}/>
      <BoxIndicador valor="6,10" indicador="LIQ.CORRENTE" tooltip={TOOLTIP_MSG.LIQ_CORRENTE}/>
      <BoxIndicador valor="6,10" indicador="ROE" tooltip={TOOLTIP_MSG.ROE}/>
      <BoxIndicador valor="6,10" indicador="ROIC" tooltip={TOOLTIP_MSG.ROIC}/>
      <BoxIndicador valor="6,10" indicador="PATRIM.LIQ." tooltip={TOOLTIP_MSG.PATRIM_LIQ}/>
      <BoxIndicador valor="6,10" indicador="DIV.BRUTA.PATRIM." tooltip={TOOLTIP_MSG.DIVIDA_LIQUIDA_PATRIM_LIQ}/>
      <BoxIndicador valor="6,10" indicador="CRESC.REC.5A" tooltip={TOOLTIP_MSG.CAGR_RECEITA_5A}/>
    </Indicadores>
  );
}

const dataDividendo = 
  { 
  columns: ["Data Pagamento", "Data Com",'Tipo', "Valor"],
  rows: [
    { ["Data Pagamento"]: "01/2023",["Data Com"]: "01/2023", Tipo: 'JCP',Valor: "1.50" },
    { ["Data Pagamento"]: "02/2023",["Data Com"]: "02/2023", Tipo: 'Dividendo',Valor: "1.25" },
    { ["Data Pagamento"]: "03/2023",["Data Com"]: "03/2023", Tipo: 'Dividendo',Valor: "3.20" },
    { ["Data Pagamento"]: "04/2023",["Data Com"]: "04/2023", Tipo: 'JCP',Valor: "0.01" },
    { ["Data Pagamento"]: "05/2023",["Data Com"]: "05/2023", Tipo: 'Dividendo',Valor: "0.02" },
    { ["Data Pagamento"]: "06/2023",["Data Com"]: "06/2023", Tipo: 'Dividendo',Valor: "0.50" },
    { ["Data Pagamento"]: "07/2023",["Data Com"]: "07/2023", Tipo: 'Dividendo',Valor: "0.75" },
    { ["Data Pagamento"]: "08/2023",["Data Com"]: "08/2023", Tipo: 'JCP',Valor: "1.50" },
    { ["Data Pagamento"]: "09/2023",["Data Com"]: "09/2023", Tipo: 'Dividendo',Valor: "1.25" },
    { ["Data Pagamento"]: "10/2023",["Data Com"]: "10/2023", Tipo: 'Dividendo',Valor: "3.20" },
    { ["Data Pagamento"]: "12/2023",["Data Com"]: "12/2023", Tipo: 'JCP',Valor: "0.01" },
  ] 
};

export default function DetalhesAcoes() {
  const router = useRouter();
  const codigo = router.query.codigo?.toString();

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
      {renderizarIndicadores()}
      <Indicadores titulo="Histórico de Cotações">
        <div className="w-full">
          <ReactECharts option={option} />
        </div>
      </Indicadores>
      <Indicadores titulo="Histórico Pagamento de Dividendo Anuais">
        <div className="w-full">
          <ReactECharts option={optionBar} />
        </div>
      </Indicadores>
      <Indicadores titulo="Histórico de Dividendos do Ano">
        <div className="w-full h-[500px] overflow-y-scroll">
          <BasicTable columns={dataDividendo.columns} rows={dataDividendo.rows} />
        </div>
      </Indicadores>
    </div>
  );
}
