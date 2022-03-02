import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Card from "../../components/Card/Card";
import ChampionContext from "../../store/champion-context";

import urls from "../../constants/urls";

const Summoner = () => {
  const { name } = useParams();
  const [summonerRawData, setSummonerRawData] = useState();
  const [summonerData, setSummonerData] = useState();


  const { getChampionById, loading } = useContext(ChampionContext);

  useEffect(() => {
    axios
      .get(`${urls.summonerId}/${name}`)
      .then((res) => res.data)
      .then((data) => {
        axios.get(`${urls.summonerMastery}/${data.id}`).then((res) => {
          setSummonerRawData(res.data);
        });
      });
  }, [name]);

  useEffect(() => {
    if (summonerRawData && !loading) {
      let detailedData = [];
      for (const data of summonerRawData) {
        const champion = getChampionById(data.championId);
        detailedData.push({
          ...champion,
          chestGranted: data.chestGranted,
          championLevel: data.championLevel,
          championPoints: data.championPoints,
        });
      }
      setSummonerData(detailedData);
    }
  }, [loading, summonerRawData, getChampionById]);

  if (loading) return <h2 className="p__info">Loading</h2>;

  return (
    <div className="summoner">
      <ul className="champions__wrapper">
          {summonerData?.map((champion) => (
            <Card data={champion} style={{ width: "150px" }} key={champion.id}>
              <div>
                <p className="p__info">{champion.name}</p>
                <p className="p__info">Mastery: {champion.championLevel}</p>
              </div>
              <div>
                <p className="p__info">Points: {champion.championPoints}</p>
                <p className="p__info">
                  Chest : {champion.chestGranted ? "Yes" : "No"}
                </p>
              </div>
            </Card>
          ))}
        </ul>
    </div>
  );
};

export default Summoner;
