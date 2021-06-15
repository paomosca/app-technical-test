import { omit } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

export function getCachedState() {
  return AsyncStorage.getItem("CACHE_KEY")
    .then((response) => JSON.parse(response) || {});
};

export function createAsyncStorageMiddleware(blacklistedKeys = []) {
  return ((store) => (next) => (action) => {
    const result = next(action);
    const newState = omit(store.getState(), blacklistedKeys);

    AsyncStorage.setItem("CACHE_KEY", JSON.stringify(newState));
    return result;
  });
}
