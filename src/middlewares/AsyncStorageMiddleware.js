import lodash from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'

const cachedStateKey = 'AfRFw3Etw4we4WeeTRfw123eaEF';

export function getCachedState() {
  return AsyncStorage.getItem(cachedStateKey)
  .then(response => JSON.parse(response) || {})
}

export function createAsyncStorageMiddleware(blacklistedKeys = []) {
  return store => next => action => {
    const result = next(action);
    const newState = store.getState();
    const cachedState = lodash.omit(newState, blacklistedKeys);

    AsyncStorage.setItem(cachedStateKey, JSON.stringify(cachedState));
    return result;
  }
}