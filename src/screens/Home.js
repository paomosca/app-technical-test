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
  TouchableOpacity,
} from 'react-native';

import _ from "lodash";

import { useSelector, useDispatch } from 'react-redux';
import { MAX_DISTANCE } from "../config/AppConfig";

import { SCOOTER_STATUSES } from "../models/scooter";

import { loadScooters, selectScooter, getUserLocation } from "../actions";

import ScooterDetails from "../components/ScooterDetails";
import MainMap from "../components/MainMap";
import { Colors, Metrics } from "../theme";

const Home = () => {
  const store = useSelector((state) => state);
  const { vehicles, location } = store;
  const dispatch = useDispatch();

  const {
    scooters, selected, nearBy,
  } = vehicles;
  const { currentPosition, ready } = location;

  const [index, setIndex] = useState(0);
  const mapRef = useRef(undefined);

  useEffect(() => {
    dispatch(getUserLocation());
    if (ready) {
      dispatch(loadScooters());
    }
  }, [ready]);

  const goPrevious = () => {
    if (index > 0) {
      selectMarker(nearBy[index - 1]);
    }
  };

  const refreshLocation = () => {
    dispatch(getUserLocation());
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
              {location.ready === false && (
                <>
                  <Text style={styles.alert}>...waiting for user location...</Text>
                  <TouchableOpacity onPress={refreshLocation}><Text style={styles.alert}>Retry</Text></TouchableOpacity>
                </>
              )}
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

export default Home;
