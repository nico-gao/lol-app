import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Card from "../../components/Card/Card";
import ChampionContext from "../../store/champion-context";

import urls from "../../constants/urls";
import "./Summoner.css";

const Summoner = () => {
  const { name } = useParams();
  const [summonerRawData, setSummonerRawData] = useState();
  const [summonerData, setSummonerData] = useState();
  const [error, setError] = useState(null);
  const [summonerName, setSummonerName] = useState("");

  const { getChampionById, loading } = useContext(ChampionContext);

  useEffect(() => {
    axios
      .get(`${urls.summonerId}/${name}`)
      .then((res) => res.data)
      .then((data) => {
        setSummonerName(data.name);
        axios.get(`${urls.summonerMastery}/${data.id}`).then((res) => {
          setSummonerRawData(res.data);
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          setError(err.response.data);
        }
      });
  }, [name]);

  useEffect(() => {
    if (summonerRawData && !loading && !error) {
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
  }, [loading, error, summonerRawData, getChampionById]);

  if (loading) return <h2 className="p__info">Loading</h2>;

  if (error) {
    return <p className="p__info">{error.message}</p>;
  }

  return (
    <div className="summoner">
      <div>
        <h2 className="summoner__name">{summonerName}'s Profile</h2>
      </div>
      <ul className="champions__wrapper">
        {summonerData?.map((champion) => (
          <Card
            data={{
              ...champion,
              type: "summoner",
              masteryLevel: champion.championLevel,
            }}
            key={champion.id}
          >
            <div className="champion__info-wrapper">
              <p className="p__info">{champion.name}</p>
              <p className="p__info">Mastery: {champion.championLevel}</p>
              <p className="p__info">
                {champion.championPoints.toLocaleString()}
              </p>
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
