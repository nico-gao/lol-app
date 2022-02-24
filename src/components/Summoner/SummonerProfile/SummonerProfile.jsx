import React from "react";

const SummonerProfile = ({ summonerData, loading, error }) => {
  let p = "no summoner found!";

  if (summonerData) {
    p = JSON.stringify(summonerData);
  }

  let content = p;

  if (loading) {
    content = 'Loading...';
  }

  return <div>
    {content}
  </div>;
};

export default SummonerProfile;
