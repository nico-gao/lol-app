import React from "react";
import { NavLink } from "react-router-dom";
import SummonerSearch from "../Summoner/SummonerSearch/SummonerSearch";

const Navbar = () => {
  return (
    <div>
      <div className="navbar__logo">
        <p>LOL</p>
      </div>
      <div className="navbar__search">
        <SummonerSearch />
      </div>
      <ul className="navbar__links">
        <li>
          <NavLink to="/">Champions</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
