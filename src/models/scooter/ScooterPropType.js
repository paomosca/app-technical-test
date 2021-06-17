import PropTypes from 'prop-types';

const ScooterPropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  status: PropTypes.number,
  battery: PropTypes.number,
  distance: PropTypes.number,
});

export default ScooterPropType;
