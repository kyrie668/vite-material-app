import React, { useRef, useState, useEffect, useReducer, useContext, createContext } from "react";
import router from "./router";
import { useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";
import styled from "styled-components";
import { Fab, Toolbar } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "@/components/ScrollTopComponents";
// import Bg from "@/assets/images/bg.png"

const Bg = require("@/assets/images/bg.png");

export const StoreContext = createContext({});

const AppContainer = styled.div`
  display: flex;
  background-repeat: no-repeat !important;
  background-size: cover !important;

  flex-direction: column;
  /* background: url(Bg); */
  /* width:100vw; */
  /* height:100vh; */
  .router-page {
    flex: 1;
    padding: 2rem;
    padding-bottom: 5rem;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  .float-go-top {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
`;

const App = () => {
  const outlet = useRoutes(router);
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
    // home state
    title: "456464",
  });
  return (
    <AppContainer style={{ background: `url(${Bg})` }}>
      <Layout></Layout>
      <div id="back-to-top-anchor"></div>
      <StoreContext.Provider value={{ storeState: state, storeDispatch: dispatch }}>
        <div className="router-page ">{outlet}</div>
      </StoreContext.Provider>
      {/* <Fab color="primary" aria-label="add" className="float-go-top" onClick={goTop}>
        <ArrowUpwardIcon />
      </Fab> */}
      <ScrollTop>
        <Fab size="medium" aria-label="scroll back to top" color="primary">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </AppContainer>
  );
};

export default App;
