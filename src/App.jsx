import React, { useRef, useState, useEffect, useReducer, useContext, createContext } from "react";
import router from "./router";
import { useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";
import styled from "styled-components";
import { Fab, Toolbar, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "@/components/ScrollTopComponents";
import { TransitionProvider } from "@/context/TransitionContext";
import MinimizeOutlinedIcon from "@mui/icons-material/MinimizeOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Crop54OutlinedIcon from "@mui/icons-material/Crop54Outlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Bg = require("@/assets/images/bg.png");

export const StoreContext = createContext({});

const AppContainer = styled.div`
  display: flex;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  min-height: 100vh;
  flex-direction: column;
  .window-menu {
    height: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    align-items: center;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;
    button {
      cursor: pointer;
      -webkit-app-region: no-drag;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
  .router-page {
    flex: 1;
    padding: 2rem;
    padding-bottom: 5rem;
    > div {
      width: 100%;
      height: 100%;
    }
    @media (max-width: 800px) {
      & {
        padding: 1rem 1rem 2rem;
      }
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

  const minSizeWindow = () => {
    window.ipcRenderer?.send("window-min");
  };
  const maximizeWindow = () => {
    window.ipcRenderer?.send("window-max");
  };
  const closeWindow = () => {
    window.ipcRenderer?.send("window-close");
  };

  return (
    // <AppContainer style={{ background: `url(${Bg})` }}>
    <AppContainer style={{}}>
      {window.ipcRenderer && (
        <div className="window-menu">
          <IconButton aria-label="min" onClick={minSizeWindow}>
            <RemoveOutlinedIcon />
          </IconButton>
          <IconButton aria-label="max" onClick={maximizeWindow}>
            <Crop54OutlinedIcon />
          </IconButton>
          <IconButton aria-label="close" onClick={closeWindow}>
            <CloseOutlinedIcon />
          </IconButton>
        </div>
      )}
      <Layout></Layout>
      <div id="back-to-top-anchor"></div>
      <StoreContext.Provider value={{ storeState: state, storeDispatch: dispatch }}>
        <div className="router-page ">
          <TransitionProvider>{outlet}</TransitionProvider>
        </div>
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
