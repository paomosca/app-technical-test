import _ from "lodash";
import { MAX_DISTANCE } from "../../config/AppConfig";
import { distanceBetweenCoords } from "../../libs/geo";

import ScooterPropType from "./ScooterPropType";
import { Images } from "../../theme";

const SCOOTER_STATUSES = {
  AVAILABLE: 0,
  BOOKED: 1,
  BATTERY_ALERT: 2,
  GPS_ALERT: 3,
  MAINTENANCE: 4,
  DISABLED: 5,
  POUND: 6,
};
const SCOOTER_ICONS = {
  [SCOOTER_STATUSES.AVAILABLE]: Images.scooters.orange,
  [SCOOTER_STATUSES.BOOKED]: Images.scooters.black,
  [SCOOTER_STATUSES.BATTERY_ALERT]: Images.scooters.red,
  [SCOOTER_STATUSES.GPS_ALERT]: Images.scooters.red,
  [SCOOTER_STATUSES.MAINTENANCE]: Images.scooters.red,
  [SCOOTER_STATUSES.DISABLED]: Images.scooters.red,
  [SCOOTER_STATUSES.POUND]: Images.scooters.red,
  SELECTED: Images.scooters.green,
};

const sortingScooters = (scooters, currentPosition) => {
  const peocessed = _.map(scooters, (item) => ({
    ...item,
    distance: currentPosition ? distanceBetweenCoords(currentPosition.lat, currentPosition.lng, item.lat, item.lng) : undefined,
  }));

  return _.sortBy(peocessed, "distance");
};

const nearByScooters = (scooters) => {
  const availables = _.filter(scooters, { status: SCOOTER_STATUSES.AVAILABLE });

  return _.filter(availables, (item) => item.distance < MAX_DISTANCE);
};

export {
  SCOOTER_STATUSES,
  SCOOTER_ICONS,
  ScooterPropType,
  sortingScooters,
  nearByScooters,
};
