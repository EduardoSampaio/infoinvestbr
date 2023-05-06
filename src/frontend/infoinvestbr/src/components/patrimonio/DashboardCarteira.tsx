import { useEffect, useState } from "react";
import CardTitle from "../shared/Indicadores";
import { ReactECharts, ReactEChartsProps } from "../shared/ReactECharts";


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

export default function DashboardCarteira() {
  const [row, setRow] = useState<any>({});
  
  useEffect(() => {
    const fetchData = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      const USER = process.env.NEXT_PUBLIC_USER_ID;
      const data = await fetch(
        `${API_HOST}/transacoes/{usuarios_id}/composicao?usuario_id=${USER}`
      );
      return await data.json();
    };

    
    fetchData()
      .then((json) => {
        setRow({
          composicao: json.result.composicao,
          ativos: json.result.ativos,
        });
      })
      .catch((error) => console.log(error));
  },[]);

  return (
    <div className="w-full px-10">
      <div className="w-full flex lg:flex-wrap xl:flex-nowrap sm:flex-wrap xs: flex-wrap">
        <div className="w-full mr-5 mb-5">
          <CardTitle titulo="Composição ativos">
            <ReactECharts option={renderChartAtivos(row.ativos)} />
          </CardTitle>
        </div>
        <div className="w-full mb-5">
          <CardTitle titulo="Composição Carteira">
            <ReactECharts option={renderChartComposicao(row.composicao)} />
          </CardTitle>
        </div>
      </div>
    </div>
  );
}
