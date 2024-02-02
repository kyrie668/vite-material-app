import React, { ReactHTMLElement, useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";

import { TooltipComponent, LegendComponent, PolarComponent, TitleComponent, GridComponent } from "echarts/components";
import { PieChart, BarChart, LineChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import styled from "styled-components";

const MyBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .people-line-chart {
    width: 100%;
    height: 100%;
  }
`;

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  PolarComponent,
  TitleComponent,
  BarChart,
  LineChart,
  GridComponent,
]);

/**
 * @xData x轴数据
 * @data y轴数据
 * @unitText 单位名称
 * @isRorate x轴标题是否竖直排列
 * @tooltipColor tooltip背景颜色
 *
 * **/
const PeopleLineChart = ({
  data,
  xData,
  showTooltip = true,
  showSymbol = false,
  showLabel = false,
  showLegend = false,
  isRorate = false,
  isSmooth = true,
  tooltipColor = "rgba(229, 181, 57, 0.52)",
  unitText = "",
}) => {
  const wrapper = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (wrapper.current && !chart.current) {
      chart.current = echarts.init(wrapper.current, null, { renderer: "svg" });
      updateOption();
    }
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize, { passive: true });
  }, []);

  const onResize = () => {
    if (chart.current) {
      chart.current.resize();
    }
  };

  useEffect(() => {
    if (chart.current) {
      chart.current.clear();
      updateOption();
    }
  }, [data, unitText, xData, isRorate, showLegend, showLabel, showSymbol, showTooltip]);

  const testData = [
    { name: "实有人口", lineColor: "#FFf", areaColor: ["#Fff", "#313165"], data: [10, 23.5, 335, 22.55] },
    {
      name: "户籍人口",
      lineColor: "#FFf",
      areaColor: "#564566",
      data: [10, 23.5, 335, 22.55],
    },
  ];

  const updateOption = () => {
    if (chart.current) {
      let colorArea;
      let symbolConfig = {
        showAllSymbol: false,
      };
      if (showSymbol) {
        symbolConfig = {
          showAllSymbol: false,
          symbol: "circle",
          symbolSize: 5,
        };
      }
      let legendList = [];
      let seriesData = data.map(({ name, lineColor, areaColor, data }, index) => {
        legendList.push(name);
        if (Array.isArray(areaColor)) {
          colorArea = {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: areaColor[0],
                },
                {
                  offset: 1,
                  color: areaColor[1],
                },
              ],
              false
            ),
          };
        } else {
          colorArea = { color: areaColor };
        }
        return {
          name: name,
          type: "line",
          smooth: isSmooth, //是否平滑
          ...symbolConfig,
          lineStyle: {
            color: lineColor,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
          },
          label: {
            show: showLabel,
            position: "top",
            // textStyle: {
            color: lineColor,
            // },
          },

          itemStyle: {
            color: lineColor,
            borderColor: "#fff",
            borderWidth: 3,
          },
          tooltip: {
            show: showTooltip,
          },
          areaStyle: {
            // normal: colorArea,
            ...colorArea,
          },
          data: data,
        };
      });

      chart.current.setOption({
        legend: {
          show: showLegend,
          top: 0,
          right: 5,
          icon: "rect",
          itemStyle: {
            borderWidth: 0,
          },
          itemGap: 20,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "black",
            fontSize: "12",
          },
          data: legendList,
        },
        backgroundColor: "transparent",
        title: {
          textStyle: {
            align: "center",
            color: "black",
            fontSize: 20,
          },
          top: "5%",
          left: "center",
        },
        tooltip: {
          width: 20,
          trigger: "axis",
          backgroundColor: tooltipColor,
          // position: "inside",
          // position: function (point: any[], params: any, dom: any, rect: any, size: { contentSize: any[] }) {
          //   // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
          //   // 提示框位置
          //   var x = 0; // x坐标位置
          //   var y = 0; // y坐标位置

          //   // 当前鼠标位置
          //   var pointX = point[0];
          //   var pointY = point[1];

          //   // 外层div大小
          //   // var viewWidth = size.viewSize[0];
          //   // var viewHeight = size.viewSize[1];

          //   // 提示框大小
          //   var boxWidth = size.contentSize[0];
          //   var boxHeight = size.contentSize[1];

          //   // boxWidth > pointX 说明鼠标左边放不下提示框
          //   if (boxWidth > pointX) {
          //     x = pointX - boxWidth;
          //   } else {
          //     // 左边放的下
          //     x = pointX - boxWidth;
          //   }

          //   // boxHeight > pointY 说明鼠标上边放不下提示框
          //   if (boxHeight > pointY) {
          //     y = 5;
          //   } else {
          //     // 上边放得下
          //     y = pointY - boxHeight;
          //   }

          //   return [pointX, 10];
          // },

          textStyle: {
            // 提示框浮层的文本样式。
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "normal",
            fontFamily: "sans-serif",
          },
          axisPointer: {
            lineStyle: {
              borderRadius: 6,
              width: 10,
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#FD890000",
                  },

                  {
                    offset: 1,
                    color: "#FCFFA7",
                  },
                ],
                false
              ),
              type: "line",
            },
          },
        },
        grid: {
          top: "5%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            splitArea: {
              // show: true,
              color: "#f00",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "black",
              interval: 0,
              formatter: function (value) {
                return isRorate ? value.split("").join("\n") : value;
              },
            },
            axisLine: {
              lineStyle: {
                color: "white", // 设置 X 轴线颜色为白色
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            boundaryGap: true,
            data: xData,
          },
        ],

        yAxis: [
          {
            name: unitText,
            type: "value",
            splitNumber: 3,
            nameTextStyle: {
              color: "black",
              fontSize: 10,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.5)",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 5,
              // textStyle: {
              color: "#d1e6eb",
              // },
            },
            axisTick: {
              show: true,
            },
          },
        ],
        series: seriesData,
      });
    }
  };

  return (
    <MyBarWrapper>
      <div ref={wrapper} className="people-line-chart"></div>
    </MyBarWrapper>
  );
};

export default React.memo(PeopleLineChart);
