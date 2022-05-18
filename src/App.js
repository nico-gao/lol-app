import React from "react";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Champions from "./pages/Champions/Champions";
import Champion from "./pages/Champion/Champion";
import Summoner from "./pages/Summoner/Summoner";

import "./App.css";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Champions />} />
          <Route path="/champion/:name" element={<Champion />} />
          <Route path="/summoner/:name" element={<Summoner />} />
          <Route path="*" component={<p>404</p>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
