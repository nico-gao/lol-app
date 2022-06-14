import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import useChampionDetail from "../../hooks/useChampionDetail";

import ChampionContext from "../../store/champion-context";
import SkinCarousel from "../../components/Skin/SkinCarousel";

import "./Skins.css";

const Skins = () => {
  const { name } = useParams();
  const location = useLocation();
  const { championData, loading, error } = useContext(ChampionContext);
  const [currentIndex, setCurrentIndex] = useState(location.state?.index || 0);

  const { detailLoading } = useChampionDetail(name);

  const skins = championData[name]?.skins;
  const length = skins?.length;

  console.log(skins);

  // preload imgs into cache
  useEffect(()=> {
    skins?.forEach((skin)=> {
      console.log(skin);
      new Image().src = skin.splashPath;
    })
  }, [skins])


  const prevHandler = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const nextHandler = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  const changeIndexHandler = (index) => {
    setCurrentIndex(index);
  };

  if (loading || detailLoading) return <h2 className="p__info">Loading</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div className="skins">
      {skins && (
        <SkinCarousel
          name={name}
          skins={skins}
          currentIndex={currentIndex}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          changeIndexHandler={changeIndexHandler}
        />
      )}
    </div>
  );
};

export default Skins;
