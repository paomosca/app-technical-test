import {
  GET_SCOOTERS,
  SCOOTERS_AROUND,
  SELECT_SCOOTER,
} from "./types";

import { sortingScooters, nearByScooters } from "../models/scooter";

import create from "../services/YegoApi";

const api = create();

export const loadScooters = () => async (dispatch, getState) => {
  const state = getState();
  const { location } = state;

  try {
    const response = await api.getScooters();
    const scooters = response.data;

    const sorted = sortingScooters(scooters, location.currentPosition);
    const nearBy = nearByScooters(sorted);

    dispatch({
      type: GET_SCOOTERS,
      payload: {
        scooters: sorted,
        nearBy,
        selected: nearBy && nearBy[0],
      },
    });

    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const selectScooter = (scooter) => (dispatch) => {
  dispatch({
    type: SELECT_SCOOTER,
    payload: scooter,
  });
};

