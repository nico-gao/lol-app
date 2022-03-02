import axios from "axios";
import React, { useState, useEffect } from "react";

import urls from "../constants/urls";

const ChampionContext = React.createContext({
  loading: true,
  error: null,
  championData: {},
  champions: [],
  detailLoaded: {},
  fetchChampionDetail: () => {},
  sortChampionData: () => {},
});

export const ChampionContextProvider = (props) => {
  const [championData, setChampionData] = useState({});
  const [champions, setChampions] = useState({});
  const [detailLoaded, setDetailLoaded] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const championsSummaryResponseHandler = (data) => {
    const fetchedChampionData = {};
    const championArray = [];
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
      championDetailLoaded[name] = false;
    }
    setChampionData(fetchedChampionData);
    setChampions(championArray);
    setDetailLoaded(championDetailLoaded);
    setLoading(false);
    console.log(fetchedChampionData);
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
        setError(err);
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
          console.log(detailLoadedCopy);
          console.log(championDataCopy);
          resHandler();
        });
    }
  };

  return (
    <ChampionContext.Provider
      value={{
        loading,
        error,
        championData,
        champions,
        detailLoaded,
        fetchChampionDetail,
      }}
    >
      {props.children}
    </ChampionContext.Provider>
  );
};

export default ChampionContext;
