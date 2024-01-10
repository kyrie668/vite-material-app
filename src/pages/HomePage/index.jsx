import { Container, Box } from "@mui/material";
import React, { useContext, useRef, useEffect } from "react";
import { StoreContext } from "../../App";
import SwipeableTextMobileStepper from "../../components/Slider";
import MasonryImageList from "../../components/ImageList";
import AlignItemsList from "../../components/CommonList";
import StickyHeadTable from "../../components/CommonTable";
import ScrollableTabsButtonAuto from "../../components/CommonTab";
import RecipeReviewCard from "../../components/CommonCard";
import PeopleLineChart from "../../components/CommonBarChart";

function HomePage() {
  const { storeState, storeDispatch } = useContext(StoreContext);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    if (contentRef.current) {
      const elements = Array.from(contentRef.current.children);
      elements.forEach((ele) => {
        ele.classList.add("opaque");
        observer.observe(ele);
      });
    }
    return () => observer.disconnect();
  }, []);

  const callback = (entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.remove("opaque");
        element.classList.add("come-in");
        instance.unobserve(element);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: "3rem",
      }}
      ref={contentRef}
    >
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "1 1 100%" },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>轮播图</h2>
        <SwipeableTextMobileStepper></SwipeableTextMobileStepper>
      </Box>
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "1 1 auto" },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2>列表</h2>
        <AlignItemsList></AlignItemsList>
      </Box>
      <Box
        sx={{
          flex: {
            xs: "1 1 auto",
            md: "1 1 800px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          },
          maxWidth: "100%",
        }}
      >
        <h2>图片列表</h2>

        <MasonryImageList></MasonryImageList>
      </Box>
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "1 1 500px" },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2>表格</h2>
        <StickyHeadTable></StickyHeadTable>
      </Box>
      <Box
        sx={{
          flex: { xs: "1 1 500px", md: "1 1 500px" },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2>可切换tab内容</h2>
        <ScrollableTabsButtonAuto></ScrollableTabsButtonAuto>
      </Box>
      <Box
        sx={{
          flex: { xs: "1 1 500px", md: "1 1 500px" },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2>卡片内容</h2>
        <RecipeReviewCard></RecipeReviewCard>
      </Box>
      <Box
        sx={{
          flex: {
            xs: "1 1 500px",
            md: "1 1 500px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          },
          maxWidth: "100%",
          height: "400px",
        }}
      >
        <h2>图表类型</h2>
        <PeopleLineChart
          tooltipColor="#A5D7FE"
          showLegend={true}
          xData={["1月", "2月", "3月", "4月", "5月", "6月"]}
          data={[
            {
              name: "投入",
              lineColor: "#6EA3DD",
              areaColor: ["rgba(110,163,221,0.5)", "rgba(110, 163, 221, 0.00)"],
              data: [10, 23.5, 15, 22.55, 11, 22],
            },
            {
              name: "产出",
              lineColor: "#FAFF65",
              areaColor: ["rgb(250,255,101,0.5)", "rgba(139, 251, 201, 0.00)"],
              data: [13, 3.5, 18, 25, 18, 12],
            },
          ]}
          showTooltip={true}
        ></PeopleLineChart>
      </Box>
    </Box>
  );
}

export default HomePage;
