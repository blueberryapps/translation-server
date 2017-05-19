/* @flow */
import type { Middleware } from 'redux';
import createInterface from '../../../utils/interfacer';

import type { ApiAction } from '../../../types/generalTypes';
import type { StateType } from '../../../types/storeTypes';

const interfaces = {
  hierarchy: createInterface('hierarchy'),
  keys: createInterface('keys'),
  locales: createInterface('locales'),
  projects: createInterface('projects'),
  translations: createInterface('translations'),
};

const apiMiddleware: Middleware<StateType, ApiAction> = () => next => (action) => {
  if (!action.method || !action.interface) {
    return next(action);
  }

  interfaces[action.interface](action.payload)
    .then(response => console.log(response))
    .catch(err => console.log(err));

  return next(action);
};

export default apiMiddleware;
