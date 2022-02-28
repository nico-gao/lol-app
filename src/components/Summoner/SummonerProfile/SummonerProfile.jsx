import React, { useEffect, useState } from "react";

import Card from "../../Card/Card";

const SummonerProfile = ({ summonerData }) => {
  const [notFound, setNotFound] = useState(true);
  let p = <p className="p__info">No summoner found!</p>;
  useEffect(() => {
    setNotFound(summonerData === undefined || summonerData?.length === 0);
  }, [summonerData, setNotFound]);
  return (
    <div className="summoner__profile">
      {notFound ? (
        p
      ) : (
        <ul className="champions__wrapper">
          {summonerData.map((champion) => (
            <Card data={champion} style={{ width: "150px" }} key={champion.id}>
              <div>
                <p className="p__info">{champion.name}</p>
                <p className="p__info">Mastery: {champion.championLevel}</p>
              </div>
              <div>
                s<p className="p__info">Points: {champion.championPoints}</p>
                <p className="p__info">
                  Chest : {champion.chestGranted ? "Yes" : "No"}
                </p>
              </div>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummonerProfile;
