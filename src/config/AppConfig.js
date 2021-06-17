
const env = "fake-yego";

let apiBase = "";
let authHeaders = {};

const MAX_DISTANCE = 1200;

switch (env) {
  case "dev":
    apiBase = "http://localhost:3000";
    break;
  case "fake-yego":
    apiBase = "https://yego-fake-api.herokuapp.com";
    break;
  case "yego":
    apiBase = "https://alphatwo.getyugo.com/api/v1";
    authHeaders = {
      Authorization: "Bearer Cu9ANbdMopfOkgW6faW5gwWHD0bdzqe4tmujQO5sSDFQhgdRpPU02e9PnDVv",
    };
    break;

  default:
    break;
}

export {
  env,
  apiBase,
  authHeaders,
  MAX_DISTANCE,
};
