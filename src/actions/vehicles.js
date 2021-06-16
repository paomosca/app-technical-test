
import Geolocation from 'react-native-geolocation-service';
import {
  GET_SCOOTERS,
  SELECT_SCOOTER,
  GET_LOCATION,
} from "./types";

import { hasLocationPermission } from "../libs/geo";

import create from "../services/YegoApi";

const api = create();

export const loadScooters = () => async (dispatch) => {
  try {
    const response = await api.getScooters();

    dispatch({
      type: GET_SCOOTERS,
      payload: response.data,
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

export const getUserLocation = () => async (dispatch) => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      dispatch({
        type: GET_LOCATION,
        payload: { lat: latitude, lng: longitude },
      });
    },
    (error) => {
      Alert.alert(`Code ${error.code}`, error.message);
    },
    {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 0,
    },
  );
};
