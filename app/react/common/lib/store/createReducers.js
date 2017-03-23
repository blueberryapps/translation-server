import recycle from 'redux-recycle';
import { combineReducers } from 'redux';
import logSlowReducers from './logSlowReducers';
// import { AUTHENTICATION_LOGOUT_SUCCESS } from '../../authentication/actions';

export default function createStoreReducers(appReducers) {
  const combinedReducers = process.env.DEVTOOLS && !process.env.IS_TEST
    ? combineReducers(logSlowReducers(appReducers, 4))
    : combineReducers(appReducers);

  // Reset app store on logout to its initial state. Because app state can be
  // persisted in localStorage, recycle on logout is a must.
  return recycle(combinedReducers, ['AUTHENTICATION_LOGOUT_SUCCESS']);
}
