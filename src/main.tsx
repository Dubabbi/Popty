import { NavermapsProvider } from "react-naver-maps";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@/styles/global.css";
import "@/styles/scrollToTop.css";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavermapsProvider ncpKeyId={import.meta.env.VITE_NAVER_MAPS_KEY}>
        <ScrollToTop />
        <App />
      </NavermapsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
