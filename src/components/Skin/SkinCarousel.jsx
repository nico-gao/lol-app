import React from "react";

import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineArrowBack,
} from "react-icons/md";
import { Link } from "react-router-dom";

import "./SkinCarousel.css";

const SkinCarousel = ({
  name,
  skins,
  currentIndex,
  prevHandler,
  nextHandler,
  changeIndexHandler,
}) => {
  const skin = skins[currentIndex];
  const length = skins.length;

  let indicatorSkins;

  if (length <= 5) {
    indicatorSkins = skins;
  } else if (currentIndex <= 1) {
    indicatorSkins = [
      ...skins.slice(length - 1 - (1 - currentIndex)),
      ...skins.slice(0, 3 + currentIndex),
    ];
  } else if (currentIndex >= length - 2) {
    indicatorSkins = [
      ...skins.slice(currentIndex - 2),
      ...skins.slice(0, 3 - (length - currentIndex)),
    ];
  } else {
    indicatorSkins = [...skins.slice(currentIndex - 2, currentIndex + 3)];
  }

  // console.log("indicator skins: ", indicatorSkins);

  const onChangeHandler = (id) => {
    const index = skins.findIndex((skin) => skin.id === id);
    changeIndexHandler(index);
  };

  return (
    <div className="carousel">
      <div className="carousel__wrapper">
        <div className="skin__wrapper">
          <img className="skin__bg" src={skin.uncenteredSplashPath} alt="" />
          <img
            className="skin__active"
            src={skin.uncenteredSplashPath}
            alt={skin.name}
          />
        </div>
      </div>

      <div className="carousel__nav">
        <div className="carousel__nav-top">
          <Link className="top__back" to={`/champion/${name}`}>
            <MdOutlineArrowBack className="backBtn" />
            <span>{name}</span>
          </Link>
        </div>

        <div className="carousel__nav-bot">
          <MdArrowBackIosNew
            className="arrow left-arrow noselect"
            onClick={prevHandler}
          />

          <div className="carousel__indicators">
            {indicatorSkins.map((cur) => (
              <img
                className={
                  skin.id === cur.id
                    ? "skin__indicator skin__indicator-active"
                    : "skin__indicator skin__indicator-other"
                }
                src={cur.splashPath}
                alt={cur.name}
                key={cur.id}
                onClick={() => onChangeHandler(cur.id)}
              />
            ))}
          </div>

          <MdArrowForwardIos
            className="arrow right-arrow noselect"
            onClick={nextHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default SkinCarousel;
