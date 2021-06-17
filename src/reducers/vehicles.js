
import _ from "lodash";
import {
  GET_SCOOTERS,
  SELECT_SCOOTER,
  SCOOTERS_AROUND,
  LOCATION_CHANGE,
} from "../actions/types";

import { sortingScooters, nearByScooters } from "../models/scooter";

const initialState = {
  scooters: [],
  nearBy: [],
  selected: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCOOTERS: {
      const { scooters, selected, nearBy } = action.payload;

      return {
        ...state,
        scooters,
        selected,
        nearBy,
      };
    }

    case SCOOTERS_AROUND: {
      const { selected, nearBy } = action.payload;

      return {
        ...state,
        nearBy,
        selected,
      };
    }

    case LOCATION_CHANGE: {
      const { scooters } = state;

      const sorted = sortingScooters(scooters, action.payload);
      const nearBy = nearByScooters(sorted);

      return {
        ...state,
        scooters: sorted,
        nearBy,
        selected: nearBy && nearBy[0],
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
