import React, { useState, useEffect } from "react";

import useHttp from "../hooks/useHttp";

const championsSummaryUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";

const championIconBaseUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";

const ChampionContext = React.createContext({
  summary: [],
  loading: true,
  error: null,
  championsDetail: [],
  addChampionsDetail: () => {},
});

export const ChampionContextProvider = (props) => {
  const [championsSummary, setChampionsSummary] = useState([]);
  const [championsDetail, setChampionsDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData: fetchSummaryData } = useHttp();

  const addChampionDetail = (data) => {
    setChampionsDetail((prev) => {
      prev.push(data);
    });
  };

  useEffect(() => {
    const championsSummaryResponseHandler = (data) => {
      const loadedChampionsSummary = [];
      for (const champion of data) {
        loadedChampionsSummary.push({
          id: champion.id,
          name: champion.name,
          alias: champion.alias,
          img: `${championIconBaseUrl}/${champion.id}.png`,
          path: `/champion/${champion.name}`,
        });
      }
      loadedChampionsSummary.shift();
      setChampionsSummary(loadedChampionsSummary);
      setLoading(false);
    };

    fetchSummaryData(
      {
        url: championsSummaryUrl,
      },
      championsSummaryResponseHandler,
      setError
    );
  }, [fetchSummaryData]);

  return (
    <ChampionContext.Provider
      value={{
        summary: championsSummary,
        loading,
        error,
        championsDetail,
        addChampionDetail,
      }}
    >
      {props.children}
    </ChampionContext.Provider>
  );
};

export default ChampionContext;
