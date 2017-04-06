import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { match, Router } from 'react-router';
import { Provider } from 'react-redux';
import { StyleRoot } from 'radium';

import configureStoreWithHistory from './configureStoreWithHistory';
import createRoutes from './createRoutes';

if (process.env.DEVTOOLS && !process.env.IS_TEST) {
  window.Perf = require('react-addons-perf'); // eslint-disable-line global-require
}

const { store, history } = configureStoreWithHistory();
const createdRoutes = createRoutes(store.dispatch, store.getState);

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const renderApp = routes => (
  <AppContainer>
    <Provider store={store}>
      <StyleRoot>
        <Router history={history}>
          {routes}
        </Router>
      </StyleRoot>
    </Provider>
  </AppContainer>
);

match({ history, createdRoutes, location }, () => { // eslint-disable-line  no-unused-vars
  ReactDOM.render(renderApp(createdRoutes), document.getElementById('react-app'));
});
