import {
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import lodash from 'lodash';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';
import {
  createAsyncStorageMiddleware,
  getCachedState,
} from './middlewares/AsyncStorageMiddleware';

const blacklistedKeys = [
  "vehicles.nearBy",
  "vehicles.selected",
  "location.ready",
];

export default async function () {
  const cachedState = lodash.omit(await getCachedState(), blacklistedKeys);
  const sagaMiddleware = createSagaMiddleware();
  const createStoreWithMiddleware = applyMiddleware(
    createAsyncStorageMiddleware(blacklistedKeys),
    sagaMiddleware,
    thunk,
  )(createStore);

  const store = createStoreWithMiddleware(reducers, cachedState);

  sagaMiddleware.run(sagas);
  return store;
}
