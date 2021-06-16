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
  Text,
} from 'react-native';

import _ from "lodash";

import { useSelector, useDispatch } from 'react-redux';
import { Colors, Metrics } from "../theme";

import { MAX_DISTANCE } from "../config/AppConfig";
import { SCOOTER_STATUSES } from "../models/scooter";
import ScooterDetails from "../components/ScooterDetails";
import MainMap from "../components/MainMap";
import { loadScooters, selectScooter, getUserLocation } from "../actions/vehicles";

const App = () => {
  const vehicles = useSelector((state) => state.vehicles);
  const dispatch = useDispatch();

  const {
    scooters, selected, nearBy, currentPosition,
  } = vehicles;

  const [index, setIndex] = useState(0);
  const mapRef = useRef(undefined);

  useEffect(() => {
    dispatch(getUserLocation());
    dispatch(loadScooters());
  }, []);

  const goPrevious = () => {
    if (index > 0) {
      selectMarker(nearBy[index - 1]);
    }
  };

  const goNext = () => {
    if (index < nearBy.length - 1) {
      selectMarker(nearBy[index + 1]);
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
      const selectedIndex = _.findIndex(nearBy, (item) => item.id === marker.id);

      if (selectedIndex !== -1) {
        setIndex(selectedIndex);
      }
      dispatch(selectScooter(marker));
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
            <View
              style={styles.panel}
            >
              {selected === undefined && (<Text style={styles.alert}>No scooters availables around</Text>)}
              {selected && (

              <ScooterDetails
                data={selected}
                goPrevious={goPrevious}
                goNext={goNext}
                selectedIndex={index}
                max={nearBy.length - 1}
              />

              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  alert: {
    color: Colors.alert,
    padding: Metrics.baseSpace,
    fontWeight: "bold",
    fontSize: 16,
  },
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
    alignItems: "center",
  },
});

export default App;
