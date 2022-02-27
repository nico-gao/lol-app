import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import SummonerProfile from "../../components/Summoner/SummonerProfile/SummonerProfile";

import useHttp from "../../hooks/useHttp";
import ChampionContext from "../../store/champion-context";

const Summoner = () => {
  const { name } = useParams();
  const [summonerId, setSummonerId] = useState();
  const [summonerRawData, setSummonerRawData] = useState();
  const [summonerData, setSummonerData] = useState();
  const { fetchData: fetchId } = useHttp();
  const { fetchData } = useHttp();

  const { getChampionById } = useContext(ChampionContext);

  useEffect(() => {
    const idResponseHandler = (data) => {
      setSummonerId(data.id);
    };

    const getIdConfig = {
      url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`,
    };

    fetchId(getIdConfig, idResponseHandler);
  }, [name, fetchId]);

  useEffect(() => {
    const dataResponseHandler = (data) => {
      setSummonerRawData(data);
    };
    const getDataConfig = {
      url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`,
    };

    if (summonerId) {
      fetchData(getDataConfig, dataResponseHandler);
    }
  }, [summonerId, fetchData]);

  useEffect(() => {
    if (summonerRawData) {
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
  }, [summonerRawData, getChampionById]);

  return (
    <div className="summoner">
      <SummonerProfile summonerData={summonerData} />
    </div>
  );
};

export default Summoner;
