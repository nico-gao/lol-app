import React from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../../constants/images";
import SummonerSearch from "../Summoner/SummonerSearch/SummonerSearch";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={images.chest} alt="hextech chest" />
        <h1 className="p__nunito">HexSpace</h1>
      </Link>
      <div className="navbar__search">
        <SummonerSearch />
      </div>
    </div>
  );
};

export default Navbar;
