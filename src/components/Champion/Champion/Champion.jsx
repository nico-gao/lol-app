import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/useHttp";
import ChampionContext from "../../../store/champion-context";
import ChampionCard from "../ChampionCard/ChampionCard";

import "./Champion.css";

const Champion = () => {
  const { name } = useParams();
  const { summary, loading, error, addChampionsDetail } =
    useContext(ChampionContext);
  const { fetchData } = useHttp();
  const [championDetail, setChampionDetail] = useState(null);
  const [toggleSkinOverlay, setToggleSkinOverlay] = useState(false);
  const [skin, setSkin] = useState(null);

  useEffect(() => {
    if (!loading) {
      const championData = summary.find((data) => data.name === name);

      const handler = (data) => {
        setChampionDetail(data);
        addChampionsDetail(data);
      };
      fetchData(
        {
          url: `http://localhost:8000/champion/${championData.alias}`,
        },
        handler
      );
    }
  }, [loading, fetchData, summary, name, addChampionsDetail]);

  if (loading) return "loading...";
  if (error) return <p>{error}</p>;

  return (
    <div className="champion">
      Champion {name}
      {!toggleSkinOverlay && (
        <ul className="champion-skins__wrapper">
          {championDetail
            ? championDetail.skins?.map((skin) => {
                const skinData = {
                  name: skin.name,
                  img: skin.loadScreenPath,
                  overlay: true,
                  onClick: () => {
                    setSkin({ name: skin.name, url: skin.splashPath });
                    setToggleSkinOverlay(true);
                  },
                };
                return <ChampionCard data={skinData} />;
              })
            : "No data loaded"}
        </ul>
      )}
      {toggleSkinOverlay && (
        <div className="champion-skin__overlay">
          <button onClick={() => setToggleSkinOverlay(false)}>Close</button>
          <img src={skin.url} alt={skin.name} />
        </div>
      )}
    </div>
  );
};

export default Champion;
