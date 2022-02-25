import React, { useContext } from "react";
import ChampionCard from "../../components/Champion/ChampionCard/ChampionCard";
import ChampionContext from "../../store/champion-context";

import "./Champions.css";

const Champions = () => {
  const { summary, error, loading } = useContext(ChampionContext);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="champions">
      <p>Champions Page</p>
      <ul className="champions__wrapper">
        {summary?.map((champion) => (
          <ChampionCard data={champion} />
        ))}
      </ul>
    </div>
  );
};

export default Champions;
