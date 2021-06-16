/*
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-native-maps';

import ScooterPropType from "../models/ScooterPropType";

const ScooterMarker = ({
  data, onPress, image,
}) => (
  <Marker
    coordinate={{ latitude: data.lat, longitude: data.lng }}
    image={image}
    onPress={() => onPress(data)}
  />

);

ScooterMarker.propTypes = {
  data: ScooterPropType.isRequired,
  onPress: PropTypes.func.isRequired,
  image: PropTypes.number.isRequired,
};

export default ScooterMarker;
