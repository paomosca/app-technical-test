import { combineReducers } from 'redux';
import vehicles from './vehicles';
import location from './location';

const rootReducer = combineReducers({
  location,
  vehicles,
});

export default rootReducer;
