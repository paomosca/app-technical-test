
import {
  LOCATION_CHANGE,
} from "../actions/types";

/* const fakePosition = {
  lat: 41.394292,
  lng: 2.163697,
}; */

const initialState = {
  currentPosition: undefined,
  ready: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return {
        ...state,
        ready: true,
        currentPosition: action.payload,
      };
    }

    default:
      return state;
  }
}
