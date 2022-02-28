import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

const Card = ({ children, data, style }) => {
  return (
    <div className="card__wrapper" style={style}>
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

export default Card;
