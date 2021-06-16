import ScooterPropType from "./ScooterPropType";
import { Images } from "../theme";

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

export { SCOOTER_STATUSES, SCOOTER_ICONS, ScooterPropType };
