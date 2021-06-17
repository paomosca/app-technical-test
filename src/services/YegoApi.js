import axios from "axios";
import { apiBase, authHeaders } from "../config/AppConfig";

let instance;

const create = (baseURL = apiBase) => {
  if (instance) {
    return instance;
  }

  const api = axios.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json; version=0",
      "Content-Type": "application/json",
      ...authHeaders,
    },
    timeout: 15000,
  });

  api.getScooters = () => api.get("/city/1/vehicles");

  instance = api;

  return instance;
};

export default create;
