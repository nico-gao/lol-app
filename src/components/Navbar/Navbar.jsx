import React from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../../constants/images";
import SummonerSearch from "../Summoner/SummonerSearch/SummonerSearch";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar__logo">
          <img src={images.chest} alt="hextech chest" />
        </div>
      </Link>
      <div className="navbar__search">
        <SummonerSearch />
      </div>
      <ul className="navbar__links">
        <NavLink to="/">
          <li className="p__nunito">Champions</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
