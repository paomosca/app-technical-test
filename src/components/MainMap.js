/*
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';
import { SCOOTER_ICONS } from "../models";
import ScooterMarker from './ScooterMarker';
import ScooterPropType from "../models/ScooterPropType";

const MainMap = React.forwardRef(({
  items, selected, selectMarker, currentPosition,
}, ref) => (
  <MapView
    ref={ref}
    style={styles.map}
    initialRegion={{
      latitude: currentPosition.lat,
      longitude: currentPosition.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    {items.map((marker) => (
      <ScooterMarker
        key={marker.id}
        data={marker}
        image={selected && selected.id === marker.id ? SCOOTER_ICONS.SELECTED : SCOOTER_ICONS[marker.status]}
        onPress={() => selectMarker(marker)}
      />
    ))}
  </MapView>
));

MainMap.propTypes = {

  items: PropTypes.arrayOf(ScooterPropType),
  selected: ScooterPropType.isRequired,
  selectMarker: PropTypes.func.isRequired,
  currentPosition: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
};

MainMap.defaultProps = {
  items: [],
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MainMap;
