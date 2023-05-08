import { useEffect, useState } from "react";
import CardTitle from "../shared/Indicadores";
import { ReactECharts, ReactEChartsProps } from "../shared/ReactECharts";
import useAuth from "@/data/hooks/useAuth";
import useFetchApi from "@/data/hooks/useFetchApi";


function renderChartComposicao(row: any[]):ReactEChartsProps["option"] {
  return  {
    tooltip: {
      trigger: "item",
      formatter: (params: any) => `${params?.value.toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}%`,
    },
    legend: {
      top: "5%",
      left: "center",
    },
    label: {
      show: true,
      position: 'center',
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "left",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: row
      },
    ],
  };
}

function renderChartAtivos(row: any[]): ReactEChartsProps["option"] {
  return {
    title: {
      text: "",
      subtext: "",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => `${params?.value.toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}%`,
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: "50%",
        data:row,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
}

export default function DashboardCarteira(props: any) {
  return (
    <div className="w-full">
      <div className="w-full flex lg:flex-wrap xl:flex-nowrap sm:flex-wrap xs: flex-wrap">
        <div className="w-full mr-5 mb-5">
          <CardTitle titulo="Composição ativos">
            <ReactECharts option={renderChartAtivos(props.rows?.ativos)} />
          </CardTitle>
        </div>
        <div className="w-full mb-5">
          <CardTitle titulo="Composição Carteira">
            <ReactECharts option={renderChartComposicao(props.rows?.composicao)} />
          </CardTitle>
        </div>
      </div>
    </div>
  );
}
