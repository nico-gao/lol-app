import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";

const SummonerSearch = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  const keypressHandler = (event) => {
    if (event.code === "Enter") {
      searchHandler();
    }
  };

  const searchHandler = () => {
    const summonerName = inputRef.current.value.replace(/\s/g, '%20');
    navigate(`/summoner/${summonerName}`);
    inputRef.current.value = "";
  };

  return (
    <div className="summonerSearch">
      <input
        onKeyPress={keypressHandler}
        ref={inputRef}
        placeholder="Enter a summoner name"
        type="text"
      />
      <button onClick={searchHandler}>Search</button>
    </div>
  );
};

export default SummonerSearch;
