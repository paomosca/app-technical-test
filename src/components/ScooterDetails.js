/*
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import ScooterPropType from "../models/ScooterPropType";

import { Colors } from "../theme";

const ScooterDetails = ({
  data, goPrevious, goNext, selectedIndex, max,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{data.name}</Text>
    <Text style={styles.info}>{`Battery: ${data.battery}%`}</Text>
    <Text style={styles.info}>{`Distance: ${parseInt(data.distance, 10)} m`}</Text>
    <View style={styles.actions}>
      <TouchableOpacity
        style={[styles.button, selectedIndex <= 0 ? styles.disabled : null]}
        disabled={selectedIndex <= 0}
        onPress={goPrevious}
      >
        <Text style={styles.buttonText}>{"<<<"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedIndex >= max ? styles.disabled : null]}
        disabled={selectedIndex >= max}
        onPress={goNext}
      >
        <Text style={styles.buttonText}>{">>>"}</Text>
      </TouchableOpacity>
    </View>
  </View>

);

ScooterDetails.propTypes = {
  data: ScooterPropType.isRequired,
  goPrevious: PropTypes.func.isRequired,
  goNext: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: Colors.green,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: Colors.gray,
  },
  container: {
    padding: 16,
    alignItems: "stretch",
    justifyContent: "center",
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.green,
  },
  info: {
    fontSize: 16,
    color: Colors.blue,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default ScooterDetails;
