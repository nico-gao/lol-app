import React, { useState, useEffect, useContext } from "react";
import ChampionContext from "../store/champion-context";

const useChampionDetail = (name ) => {
  const { championData, detailLoaded, fetchChampionDetail, loading, error } =
    useContext(ChampionContext);
  const [detailLoading, setDetailLoading] = useState(true);

  useEffect(() => {
    if (!loading && detailLoaded[name] !== true) {
      const resHandler = () => {
        setDetailLoading(false);
      };
      fetchChampionDetail(name, resHandler);
    }
    else if (detailLoaded[name]) {
      setDetailLoading(false);
    }
  }, [loading, fetchChampionDetail, name, detailLoaded]);

  return { detailLoading };
};

export default useChampionDetail;
