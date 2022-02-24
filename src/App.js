import React from "react";

import { Routes, Route } from "react-router-dom";

import Champions from "./pages/Champions/Champions";
import Navbar from "./components/Navbar/Navbar";
import Summoner from "./pages/Summoner/Summoner";

const App = () => {
  return <div>
    <Navbar />
    <div className="main">
      <Routes>
        <Route path="/" element={<Champions />} />
        <Route path="/summoner/:name" element={<Summoner />} />
      </Routes>
    </div>
    
  </div>;
};

export default App;
