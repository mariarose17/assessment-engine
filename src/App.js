import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../src/router";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
