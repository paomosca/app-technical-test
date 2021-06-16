
import {
  GET_SCOOTERS,
} from "./types";

import create from "../services/YegoApi";

const api = create();

export const loadScooters = () => async (dispatch) => {
  try {
    const response = await api.getScooters();

    console.log('response loadScooters', response);
    dispatch({
      type: GET_SCOOTERS,
      payload: response.data,
    });

    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

