import React, { lazy, Suspense } from "react";
// Navigate重定向组件
import { Navigate } from "react-router-dom";

import LoadingPage from "./pages/LoadingPage";
import TransitionComponent from "./components/TransitionComponents";
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Page404 = lazy(() => import("./pages/Page404"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

const routes = [
  {
    path: "/",
    element: <Navigate to="/Home" />,
  },
  {
    path: "/Home",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <TransitionComponent>
          <HomePage />
        </TransitionComponent>
      </Suspense>
    ),
  },
  {
    path: "/Contact",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <TransitionComponent>
          <ContactPage />
        </TransitionComponent>
      </Suspense>
    ),
  },
  {
    path: "/Blog",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <TransitionComponent>
          <BlogPage />
        </TransitionComponent>
      </Suspense>
    ),
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  // 访问其余路径的时候直接跳到首页
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
export default routes;
