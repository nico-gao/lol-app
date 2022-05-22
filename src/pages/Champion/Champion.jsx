import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import ChampionContext from "../../store/champion-context";
import useChampionDetail from "../../hooks/useChampionDetail";

import SkinDetail from "../../components/Skin/SkinDetail";
import Card from "../../components/Card/Card";

import "./Champion.css";

const Champion = () => {
  const { name } = useParams();
  const { championData, loading, error } = useContext(ChampionContext);
  const skins = championData[name]?.skins;

  const { detailLoading } = useChampionDetail(name);

  if (loading || detailLoading) return <h2 className="p__info">Loading</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div className="champion">
      <h1 className="champion__name">{name}</h1>
      <ul className="champion__skins-wrapper">
        {skins?.map((skin, index) => {
          const skinData = {
            type: "skin",
            name: skin.name,
            id: skin.id,
            img: skin.loadScreenPath,
            index,
            path: `/champion/${name}/skins`,
          };
          return (
            <Card data={skinData} key={skinData.id}>
              <SkinDetail data={skin} />
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default Champion;
