
const env = "dev";

let apiBase;
const MAX_DISTANCE = 1200;

switch (env) {
  case "dev":
    apiBase = "http://localhost:3000";
    break;
  case "yego":
    apiBase = "https://alphatwo.getyugo.com/api/v1";
    break;

  default:
    break;
}

export {
  env,
  apiBase,
  MAX_DISTANCE,
};
