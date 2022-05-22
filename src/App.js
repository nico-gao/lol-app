import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Champions from "./pages/Champions/Champions";
import Champion from "./pages/Champion/Champion";
import Skins from "./pages/Skins/Skins";
import Summoner from "./pages/Summoner/Summoner";

import "./App.css";
import Footer from "./components/Footer/Footer";

const App = () => {
  const location = useLocation();

  const isSkin = location.pathname.includes("skins");

  return (
    <div className="app">
      {!isSkin && <Navbar />}
      <div className="main">
        <Routes>
          <Route path="/" element={<Champions />} />
          <Route path="/champion/:name" element={<Champion />} />
          <Route path="/champion/:name/skins" element={<Skins />} />
          <Route path="/summoner/:name" element={<Summoner />} />
          <Route path="*" component={<p>404</p>}/>
        </Routes>
      </div>
      {!isSkin && <Footer />}
    </div>
  );
};

export default App;
