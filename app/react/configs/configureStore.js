import { createStore, compose } from 'redux';

import actionWatchers from './actionWatchers';
import appReducers from '../reducers';
import createMiddlewares from './lib/store/createMiddlewares';
import createStoreReducers from './lib/store/createReducers';
import runDefaultActions from './runDefaultActions';

export default function configureStore({ initialState, platformMiddleware } = {}) {
  // Browser, Client and Native can inject own middlewares into redux store
  const definedPlatformMiddleware = platformMiddleware || [];

  const railsState = initialState;
  const newInitialState = {
    init: railsState, // TODO: fix Redux state initiation, store init has no appropriate reducer
  };

  // Combine all reducers and enhance them
  const reducers = createStoreReducers(appReducers);

  // Create store middlewares
  const middlewares = createMiddlewares({
    actionWatchers,
    newInitialState,
    definedPlatformMiddleware,
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
  // Create Store
  const store = createStore(reducers, newInitialState, composeEnhancers(middlewares));

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./reducers', () => {
      const nextAppReducer = require('../reducers'); // eslint-disable-line global-require
      store.replaceReducer(createStoreReducers(nextAppReducer));
    });
  }

  // Run default actions - log in user, etc.
  runDefaultActions(store.dispatch);

  return store;
}
