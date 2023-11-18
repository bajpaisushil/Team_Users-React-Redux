import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Team from "./components/Team.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
