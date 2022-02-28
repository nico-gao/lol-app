import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import useHttp from "../../../hooks/useHttp";
import SkinDetail from "../Skin/SkinDetail";
import ChampionContext from "../../../store/champion-context";
import Card from "../../Card/Card";

import "./Champion.css";

const Champion = () => {
  const { name } = useParams();
  const { summary, loading, error, getChampionById } =
    useContext(ChampionContext);
  const { fetchData } = useHttp();
  const [championDetail, setChampionDetail] = useState(null);
  const [toggleSkinOverlay, setToggleSkinOverlay] = useState(false);
  const [skin, setSkin] = useState(null);

  useEffect(() => {
    if (!loading) {
      const championData = summary.find((data) => data.name === name);
      console.log(getChampionById(championData.id));
      const handler = (data) => {
        setChampionDetail(data);
      };
      fetchData(
        {
          url: `http://localhost:8000/champion/${championData.alias}`,
        },
        handler
      );
    }
  }, [loading, fetchData, summary, name, getChampionById]);

  if (championDetail) {
    console.log(championDetail);
  }

  if (loading) return "loading...";
  if (error) return <p>{error}</p>;

  return (
    <div className="champion">
      <ul className="champion__skins-wrapper">
        {championDetail
          ? championDetail.skins?.map((skin) => {
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
                <Card data={skinData} style={{ width: "250px" }} key={skinData.id}>
                  <SkinDetail data={skin} />
                </Card>
              );
            })
          : "No data loaded"}
      </ul>
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
