import { reducer as onionForm } from 'onion-form';
import { routerReducer as routing } from 'react-router-redux';

import device from './lib/device/reducer';
import ui from './ui/reducer';
import projects from './projects/reducer';

const appReducers = {
  device,
  onionForm,
  routing,
  ui,
  projects,
};

export default appReducers;
