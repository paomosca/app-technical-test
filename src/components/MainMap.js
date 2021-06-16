/*
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';
import { SCOOTER_ICONS, ScooterPropType } from "../models/scooter";
import ScooterMarker from './ScooterMarker';

const MainMap = React.forwardRef(({
  items, selected, selectMarker, currentPosition,
}, ref) => (
  <MapView
    ref={ref}
    style={styles.map}
    initialRegion={currentPosition && {
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
  selected: ScooterPropType,
  selectMarker: PropTypes.func.isRequired,
  currentPosition: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

MainMap.defaultProps = {
  items: [],
  currentPosition: undefined,
  selected: undefined,
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MainMap;
