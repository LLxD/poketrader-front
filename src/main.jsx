import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Trades from "./components/Trades";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="trades" element={<Trades />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
