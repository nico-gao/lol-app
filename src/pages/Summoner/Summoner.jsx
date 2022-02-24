import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
// import SummonerProfile from "../../components/Summoner/SummonerProfile/SummonerProfile";

import useHttp from "../../hooks/useHttp";

const Summoner = () => {
  const { name } = useParams();
  const [summonerId, setSummonerId] = useState();
  const [summonerData, setSummonerData] = useState();
  const { fetchData: fetchId } = useHttp();
  const { fetchData } = useHttp();

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
      setSummonerData(data);
    }
    const getDataConfig = {
      url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`,
    };

    if (summonerId) {
      console.log("got id");
      fetchData(getDataConfig, dataResponseHandler);
    }
  }, [summonerId, fetchData]);

  return (
    <div className="summoner">
      <p>Summoner Page</p>
      <p>{name}</p>
      <p>{summonerId}</p>
      <p>{JSON.stringify(summonerData)}</p>
      {/* <SummonerProfile summonerData={summonerData} loading={loading} error={error} /> */}
    </div>
  );
};

export default Summoner;
