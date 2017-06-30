import { combineReducers } from 'redux';

import translations from './translations/reducer';
import releases from './releases/reducer';

export default combineReducers({
  translations,
  releases
});
