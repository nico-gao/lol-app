let baseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseUrl  = "http://localhost:8000";
} else {
  baseUrl = process.env.REACT_APP_BACKEND_URL;
}

const championSummary = `${baseUrl}/summary`;

const championDetail = `${baseUrl}/champion`;

const championRoles = `${baseUrl}/roles`;

const championIcon =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons";

const summonerId = `${baseUrl}/summoner/id`;

const summonerMastery = `${baseUrl}/summoner/mastery`;

const urls = {
  championSummary,
  championDetail,
  championIcon,
  summonerId,
  summonerMastery,
  championRoles
};

export default urls;
