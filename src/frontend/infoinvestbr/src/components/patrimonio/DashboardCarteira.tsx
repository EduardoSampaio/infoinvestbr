import CardTitle from "../shared/Indicadores";
import { ReactECharts, ReactEChartsProps } from "../shared/ReactECharts";

const option: ReactEChartsProps["option"] = {
  tooltip: {
    trigger: "item",
    formatter: (params: any) => `${params?.value}%`,
  },
  legend: {
    top: "5%",
    left: "center",
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
      data: [
        { value: 60, name: "Ações" },
        { value: 40, name: "Fundos Imobiliários" },
      ],
    },
  ],
};

const option2: ReactEChartsProps["option"] = {
  title: {
    text: "",
    subtext: "",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: (params: any) => `${params?.value}%`,
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
      data: [
        { value: 5.26, name: "BBAS3" },
        { value: 4.81, name: "CMIG4" },
        { value: 5.38, name: "CPLE6" },
        { value: 10.68, name: "RANI3" },
        { value: 7.81, name: "CXSE3" },
        { value: 7.44, name: "SANB11" },
        { value: 9.61, name: "TAEE11" },
        { value: 7.94, name: "TRLP4" },
      ],
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

const option3: ReactEChartsProps["option"] = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

export default function DashboardCarteira() {
  return (
    <div className="w-full px-10">
      {/* <div className="w-full">
          <CardTitle titulo="Patrimônio">
            <ReactECharts option={option3}/>
          </CardTitle>
     </div>     */}
      <div className="w-full flex flex-nowrap">
        <div className="w-full mr-5 mb-5">
          <CardTitle titulo="Composição classe de ativo">
            <ReactECharts option={option2} />
          </CardTitle>
        </div>
        <div className="w-full mb-5">
          <CardTitle titulo="Composição Ativos">
            <ReactECharts option={option} />
          </CardTitle>
        </div>
      </div>
    </div>
  );
}
