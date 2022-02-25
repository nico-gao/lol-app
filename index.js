PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

const championDetailBaseUrl =
  "https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions";

app.get("/champion/:name", (req, res) => {
  const name = req.params.name;
  axios.get(`${championDetailBaseUrl}/${name}.json`).then((response) => {
    res.json(response.data);
  });
});

app.get('/', (req, res) => {
  res.send("hi");
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
