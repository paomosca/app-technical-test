
import {
  GET_SCOOTERS,
  SELECT_SCOOTER,
  GET_LOCATION,
} from "../actions/types";

import { sortingScooters, nearByScooters } from "../models/scooter";

const fakePosition = {
  lat: 41.394292,
  lng: 2.163697,
};

const initialState = {
  scooters: [],
  currentPosition: fakePosition,
  nearBy: [],
  selected: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCOOTERS: {
      const { currentPosition } = state;

      const sorted = sortingScooters(action.payload, currentPosition);
      const near = nearByScooters(sorted);

      return {
        ...state,
        scooters: sorted,
        nearBy: near,
        selected: near && near[0],
      };
    }

    case GET_LOCATION: {
      const { scooters } = state;
      const sorted = sortingScooters(scooters, action.payload);
      const near = nearByScooters(sorted);

      return {
        ...state,
        scooters: sorted,
        nearBy: near,
        selected: near && near[0],
        currentPosition: action.payload,
      };
    }

    case SELECT_SCOOTER: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    default:
      return state;
  }
}
