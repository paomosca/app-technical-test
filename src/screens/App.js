/*
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import _ from "lodash";

import { useSelector, useDispatch } from 'react-redux';
import { Colors } from "../theme";

import { currentPosition, distanceBetweenCoords } from "../libs/geo";
import { MAX_DISTANCE } from "../config/AppConfig";
import { SCOOTER_STATUSES } from "../models";
import ScooterDetails from "../components/ScooterDetails";
import MainMap from "../components/MainMap";
import { loadScooters } from "../actions/vehicles";
import create from "../services/YegoApi";

const orderScooters = (scooters) => {
  const peocessed = _.map(scooters, (item) => ({
    ...item,
    distance: distanceBetweenCoords(currentPosition.lat, currentPosition.lng, item.lat, item.lng),
  }));

  return _.sortBy(peocessed, "distance");
};

const closeScooters = (scooters, distance) => _.filter(scooters, (item) => item.distance < distance);

const App = () => {
  // const vehicles = useSelector((state) => state.vehicles);
  // const { scooters } = vehicles;
  // const dispatch = useDispatch();

  const [scooters, setScooters] = useState([]);
  const [availables, setAvailables] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [index, setIndex] = useState(0);
  const mapRef = useRef(undefined);
  const api = create();

  useEffect(() => {
    getScooters();
    // dispatch(loadScooters());
  }, []);

  const getScooters = async () => {
    try {
      const response = await api.getScooters();

      const totalScooters = orderScooters(response.data);

      const availableScooters = _.filter(totalScooters, { status: SCOOTER_STATUSES.AVAILABLE });
      const nearby = closeScooters(availableScooters, MAX_DISTANCE);

      setScooters(totalScooters);
      setAvailables(nearby);
      selectMarker(nearby[0] || undefined);
    } catch (ex) {
      console.log('ex', ex);
    }
  };

  const goPrevious = () => {
    if (index > 0) {
      selectMarker(availables[index - 1]);
    }
  };

  const goNext = () => {
    if (index < availables.length - 1) {
      selectMarker(availables[index + 1]);
    }
  };

  const selectMarker = (marker) => {
    if (marker.status !== SCOOTER_STATUSES.AVAILABLE) {
      return;
    }

    if (marker.distance !== undefined && marker.distance < MAX_DISTANCE) {
      if (mapRef) {
        mapRef.current.animateCamera({
          center: {
            latitude: marker.lat,
            longitude: marker.lng,
          },
        });
      }
      const selectedIndex = _.findIndex(availables, (item) => item.id === marker.id);

      if (selectedIndex !== -1) {
        setIndex(selectedIndex);
      }
      setSelected(marker);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <MainMap
              ref={mapRef}
              items={scooters}
              selectMarker={selectMarker}
              currentPosition={currentPosition}
              selected={selected}
            />
            {selected && (
              <View
                style={styles.panel}
              >
                <ScooterDetails
                  data={selected}
                  goPrevious={goPrevious}
                  goNext={goNext}
                  selectedIndex={index}
                  max={availables.length - 1}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    width: '100%',
  },
  sectionContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  panel: {
    backgroundColor: Colors.white,
  },
});

export default App;
