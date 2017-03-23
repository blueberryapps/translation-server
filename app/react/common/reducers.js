import { routerReducer as routing } from 'react-router-redux';

import device from './lib/device/reducer';

const appReducers = {
  device,
  routing
};

export default appReducers;
