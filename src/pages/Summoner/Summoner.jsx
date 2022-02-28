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
      url: `${process.env.REACT_APP_BACKEND_URL}/summoner/id/${name}`,
    };

    fetchId(getIdConfig, idResponseHandler);
  }, [name, fetchId]);

  useEffect(() => {
    const dataResponseHandler = (data) => {
      setSummonerRawData(data);
    };
    const getDataConfig = {
      url: `${process.env.REACT_APP_BACKEND_URL}/summoner/mastery/${summonerId}`
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
