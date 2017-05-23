import createBrowserHistory from 'history/lib/createBrowserHistory';
import withScroll from 'scroll-behavior';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { useRouterHistory } from 'react-router';

import configureCommonStore from './configs/configureStore';

export default function configureStoreWithHistory() {
  const appHistory = withScroll(useRouterHistory(createBrowserHistory)({ basename: '/app' }));
  const store = configureCommonStore({
    initialState: window.__INITIAL_STATE__, // eslint-disable-line no-underscore-dangle
    platformMiddleware: [routerMiddleware(appHistory)],
  });

  const history = syncHistoryWithStore(appHistory, store);

  return { store, history };
}
