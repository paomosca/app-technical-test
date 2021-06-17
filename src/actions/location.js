import { Alert } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import {
  LOCATION_CHANGE,
} from "./types";

import { hasLocationPermission } from "../libs/geo";

export const getUserLocation = () => async (dispatch) => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      dispatch({
        type: LOCATION_CHANGE,
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
