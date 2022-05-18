import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";
import images from "../../constants/images";

const Card = ({ children, data, style }) => {
  const { name, img, path, overlay, onClick, championLevel, type } = data;
  return (
    <div className="card__wrapper" style={style}>
      <div className="card__img">
        {!overlay && (
          <Link to={path}>
            <img src={img} alt={name} />
          </Link>
        )}
        
        {data.overlay && <img src={img} alt={name} onClick={onClick} />}

        {type === "summoner" && (
          <img
            className="mastery"
            src={images[`mastery${championLevel}`]}
            alt={`mastery${championLevel}`}
          />
        )}
      </div>
      <div className="card__info">{children}</div>
    </div>
  );
};

export default Card;
