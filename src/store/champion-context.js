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
  championDataById: {},
  getChampionById: () => {},
});

export const ChampionContextProvider = (props) => {
  const [championsSummary, setChampionsSummary] = useState([]);
  const [championDataById, setChampionDataById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData: fetchSummaryData } = useHttp();


  const getChampionById = (id) => {
    if (!loading) {
      return championDataById[id];
    }
  };

  useEffect(() => {
    const championsSummaryResponseHandler = (data) => {
      const loadedChampionsSummary = [];
      const championIdData = {};
      for (const champion of data) {
        const { id, name, alias } = champion;
        const detail = {
          id: id,
          name: name,
          alias: alias,
          img: `${championIconBaseUrl}/${champion.id}.png`,
          path: `/champion/${champion.name}`,
        };
        loadedChampionsSummary.push(detail);
        championIdData[id] = { ...detail };
      }
      loadedChampionsSummary.shift();
      setChampionsSummary(loadedChampionsSummary);
      setChampionDataById(championIdData);
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
        championDataById,
        getChampionById,
      }}
    >
      {props.children}
    </ChampionContext.Provider>
  );
};

export default ChampionContext;
