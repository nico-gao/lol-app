import React from "react";
import { Link } from "react-router-dom";

const ChampionCard = ({ children, data }) => {
  return (
    <div className="championCard__wrapper">
      <div className="card__img">
        {!data.overlay && (
          <Link to={data.path}>
            <img src={data.img} alt={data.name} />
          </Link>
        )}
        {data.overlay && (
          <img src={data.img} alt={data.name} onClick={data.onClick} />
        )}
      </div>
      <div className="card__info">
        {children}
      </div>
    </div>
  );
};

export default ChampionCard;
