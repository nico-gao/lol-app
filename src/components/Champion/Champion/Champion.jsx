import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import SkinDetail from "../Skin/SkinDetail";
import ChampionContext from "../../../store/champion-context";
import Card from "../../Card/Card";

import "./Champion.css";

const Champion = () => {
  const { name } = useParams();
  const { championData, detailLoaded, fetchChampionDetail, loading, error } =
    useContext(ChampionContext);
  const [detailLoading, setDetailLoading] = useState(true);
  const [toggleSkinOverlay, setToggleSkinOverlay] = useState(false);
  const [skin, setSkin] = useState(null);
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    if (!loading && detailLoaded[name] !== true) {
      const resHandler = () => {
        setDetailLoading(false);
        setSkins(championData[name].skins);
      };
      fetchChampionDetail(name, resHandler);
    }
  }, [loading, fetchChampionDetail, name, championData, detailLoaded]);

  useEffect(() => {
    if (detailLoaded[name]) {
      setDetailLoading(false);
      setSkins(championData[name].skins);
    }
  }, [detailLoaded, name, championData]);

  if (loading || detailLoading) return <h2 className="p__info">Loading</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div className="champion">
      <h1 className="champion__name">{name}</h1>
      <ul className="champion__skins-wrapper">
        {skins?.map((skin) => {
          const skinData = {
            type: "skin",
            name: skin.name,
            id: skin.id,
            img: skin.loadScreenPath,
            overlay: true,
            onClick: () => {
              setSkin({
                name: skin.name,
                url: skin.uncenteredSplashPath,
              });
              setToggleSkinOverlay(true);
            },
          };
          return (
            <Card data={skinData} key={skinData.id}>
              <SkinDetail data={skin} />
            </Card>
          );
        })}
      </ul>

      {/* {toggleSkinOverlay && (
        <div className="overlay__close">
        </div>
      )} */}
      {toggleSkinOverlay && (
        <div className="champion-skin__overlay">
          <img src={skin.url} alt={skin.name} className="overlay__bg" />
          <img src={skin.url} alt={skin.name} className="overlay__img" />
          <AiOutlineClose onClick={() => setToggleSkinOverlay(false)} />
        </div>
      )}
    </div>
  );
};

export default Champion;
