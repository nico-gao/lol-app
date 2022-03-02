import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import ChampionContext from "../../store/champion-context";

import "./Champions.css";

const Champions = () => {
  const { champions, error, loading } = useContext(ChampionContext);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (loading) {
    return <h2 className="p__info">Loading...</h2>;
  }


  return (
    <div className="champions">
      <ul className="champions__wrapper">
        {champions?.map((champion) => (
          <Card data={champion} style={{width: '130px'}} key={champion.id} >
            <p className="p__info">{champion.name}</p>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Champions;
