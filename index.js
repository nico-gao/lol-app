PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

const summonerIdBaseUrl =
  "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name";

const summonerMasteryBaseUrl =
  "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner";

const championsSummaryUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";

const championIconBaseUrl =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";

const championDetailBaseUrl =
  "https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions";

app.get("/champion/:name", (req, res) => {
  const name = req.params.name;
  axios.get(`${championDetailBaseUrl}/${name}.json`).then((response) => {
    res.json(response.data);
  });
});

app.get("/summoner/id/:name", (req, res) => {
  const name = req.params.name;
  axios
    .get(
      `${summonerIdBaseUrl}/${name}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
    )
    .then((response) => {
      res.json(response.data);
    });
});

app.get("/summoner/mastery/:id", (req, res) => {
  const id = req.params.id;
  axios
    .get(
      `${summonerMasteryBaseUrl}/${id}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
    )
    .then((response) => {
      const { data } = response;
      res.json(data);
    });
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
