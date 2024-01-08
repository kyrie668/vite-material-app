import React, { useRef, useState, useEffect, useReducer, useContext, createContext } from "react";
import router from "./router";
import { useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";
import styled from "styled-components";
import { Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const StoreContext = createContext({});

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width:100vw; */
  /* height:100vh; */
  .router-page {
    flex: 1;
    padding: 24px;
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
    <AppContainer>
      <Layout></Layout>
      <StoreContext.Provider value={{ storeState: state, storeDispatch: dispatch }}>
        <div className="router-page">{outlet}</div>
      </StoreContext.Provider>
      <Fab color="primary" aria-label="add" className="float-go-top" onClick={goTop}>
        <ArrowUpwardIcon />
      </Fab>
    </AppContainer>
  );
};

export default App;
