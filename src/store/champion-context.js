import axios from "axios";
import React, { useState, useEffect } from "react";

import urls from "../constants/urls";

const ChampionContext = React.createContext({
  loading: true,
  error: null,
  championData: {},
  champions: [],
  championId: {},
  detailLoaded: {},
  fetchChampionDetail: () => {},
  sortChampionData: () => {},
  getChampionById: () => {},
});

export const ChampionContextProvider = (props) => {
  const [championData, setChampionData] = useState({});
  const [champions, setChampions] = useState({});
  const [championId, setChampionId] = useState({});
  const [detailLoaded, setDetailLoaded] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const championsSummaryResponseHandler = (data) => {
    const fetchedChampionData = {};
    const championArray = [];
    const championIdToName = {};
    const championDetailLoaded = {};
    for (const champion of data) {
      const { id, name, alias } = champion;
      if (name === "None") {
        continue;
      }
      const detail = {
        id: id,
        name: name,
        alias: alias,
        img: `${urls.championIcon}/${champion.id}.png`,
        path: `/champion/${champion.name}`,
      };
      fetchedChampionData[name] = { ...detail };
      championArray.push(detail);
      championIdToName[id] = name;
      championDetailLoaded[name] = false;
    }
    setChampionData(fetchedChampionData);
    setChampions(championArray);
    setChampionId(championIdToName);
    setDetailLoaded(championDetailLoaded);
    setLoading(false);
  };

  useEffect(() => {
    axios
      .get(urls.championSummary)
      .then((res) => {
        const summary = res.data;
        championsSummaryResponseHandler(summary);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  const fetchChampionDetail = (championName, resHandler = () => {}) => {
    if (!loading && !detailLoaded[championName]) {
      const championAlias = championData[championName].alias;
      axios
        .get(`${urls.championDetail}/${championAlias}`)
        .then((res) => {
          const championDetailData = res.data;
          let championDataCopy = championData;
          championDataCopy[championName] = {
            ...championDataCopy[championName],
            skins: championDetailData.skins,
          };
          const detailLoadedCopy = detailLoaded;
          detailLoadedCopy[championName] = true;
          setChampionData(championDataCopy);
          setDetailLoaded(detailLoadedCopy);
          resHandler();
        });
    }
  };

  const getChampionById = (id) => {
    const name = championId[id];
    const data = championData[name];
    return data;
  }

  return (
    <ChampionContext.Provider
      value={{
        loading,
        error,
        championData,
        champions,
        championId,
        detailLoaded,
        fetchChampionDetail,
        getChampionById,
      }}
    >
      {props.children}
    </ChampionContext.Provider>
  );
};

export default ChampionContext;
