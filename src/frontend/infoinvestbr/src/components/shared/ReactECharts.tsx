import React, { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import { useTheme } from "@mui/material";

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export function ReactECharts({
  option,
  style,
  settings,
  loading,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const dark = theme.palette.mode === "dark" ? "dark" : "light";

  useEffect(() => {

    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, dark);
    }

    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [dark]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      option.backgroundColor = dark === 'dark' ? '#1D2226' : 'white';
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme, dark]); 

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px", ...style }} />;
}